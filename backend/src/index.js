import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { verifyToken } from './libs/token';
import { createTokens } from './libs/auth';

import {
  ACCESS_TOKEN_SECRET,
  PORT,
  REFRESH_TOKEN_SECRET,
} from './config/variables';
import { getConnection } from './libs/connection';
import User from './models/User';
import { schema } from './modules/executableSchema';

const startServer = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());

  await getConnection();

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      const auth = req.headers.Authorization || '';

      return { req, res };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  app.use(cookieParser());

  app.use(async (req, res, next) => {
    const refreshToken = req.cookies['refresh-token'];
    const accessToken = req.cookies['access-token'];

    if (!refreshToken && !accessToken) {
      return next();
    }

    try {
      const data = verifyToken(accessToken, ACCESS_TOKEN_SECRET);
      req.userId = data.id;
      return next();
    } catch {
      console.error('access token not valid');
    }

    if (!refreshToken) {
      return next();
    }

    let data;

    try {
      data = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);
    } catch {
      console.error('refresh token not valid');
      return next();
    }

    const user = await User.findOne({ id: data.userId });

    // invalidated token
    if (!user || user.count !== data.count) {
      return next();
    }

    const tokens = createTokens(user);

    res.cookie('refresh-token', tokens.refreshToken);
    res.cookie('access-token', tokens.accessToken);
    req.userId = user.id;

    next();
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const port = PORT || 4000;

  app.get('/', (_, res) => res.redirect('/graphql'));

  app.listen(port, () => {
    console.info(`🚀 Server started at http://localhost:${port}/graphql`);
  });
};

startServer();
