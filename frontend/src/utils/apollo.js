import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

import { config } from 'src/config';
import { route } from 'src/Routes';
import { auth, signOut } from 'src/modules/auth/apollo/client';

const UNAUTHENTICATED_CODE = 'UNAUTHENTICATED';

const hasUnauthenticatedErrorCode = (errors) => {
  return errors && errors.some((error) => error.extensions.code === UNAUTHENTICATED_CODE);
};

const hasNetworkStatusCode = (error, code) => {
  return error && error.statusCode === code;
};

const httpLink = createHttpLink({
  uri: config.GRAPHQL_API,
});

const cache = new InMemoryCache();
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
  const navigate = useNavigate();
  const { token } = auth();

  const handleSignOut = useCallback(() => {
    signOut();
    navigate(route.signIn());
    window.location.reload();
  }, [navigate]);

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return forward(operation);
  });

  const logoutLink = onError(({ graphQLErrors, networkError }) => {
    if (hasUnauthenticatedErrorCode(graphQLErrors) || hasNetworkStatusCode(networkError, 401)) {
      handleSignOut();
    }
  });

  const client = new ApolloClient({
    link: from([logoutLink, authLink, httpLink]),
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
