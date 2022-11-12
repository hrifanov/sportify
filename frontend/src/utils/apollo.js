import { useCallback } from 'react';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
  gql,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

import { config } from 'src/config';
import { useAuthClient } from 'src/modules/auth/apollo/client';
import * as events from 'events';
import { interactiveMatchState } from '../modules/matches/apollo/interactiveMatchClient.js';

const UNAUTHENTICATED_CODE = 'not-authenticated';
const TOKEN_EXPIRED_CODE = 'jwt-expired';

const hasUnauthenticatedErrorCode = (errors) => {
  return errors && errors.some((error) => error.extensions.code === UNAUTHENTICATED_CODE);
};

const hasTokenExpiredErrorCode = (errors) => {
  return errors && errors.some((error) => error.extensions.code === TOKEN_EXPIRED_CODE);
};

const hasNetworkStatusCode = (error, code) => {
  return error && error.statusCode === code;
};

const httpLink = createHttpLink({
  uri: config.GRAPHQL_API,
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        interactiveMatch: {
          read() {
            return interactiveMatchState();
          },
        },
      },
    },
  },
});

export const setupPersistence = async () => {
  try {
    await persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
    });
  } catch (error) {
    console.error(error);
  }
};

export function EnhancedApolloProvider({ children }) {
  const { accessToken, signOut } = useAuthClient();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    });

    return forward(operation);
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (hasTokenExpiredErrorCode(graphQLErrors)) {
      //  TODO: Refresh token
      return handleSignOut();
    }

    if (hasUnauthenticatedErrorCode(graphQLErrors) || hasNetworkStatusCode(networkError, 401)) {
      handleSignOut();
    }
  });

  const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-and-network',
      },
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
