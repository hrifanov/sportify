import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import cookieParser from 'cookie-parser';
import { verifyAccessToken } from './libs/token';

import { PORT, ACCESS_TOKEN_SECRET } from './config/variables';
import { getConnection } from './libs/connection';
import { schema } from './modules/executableSchema';

const startServer = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());

  //const dbConnection = MOCKS ? console.log('MOCKS loaded'): await getConnection();

  const dbConnection = await getConnection();

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      const auth = req.headers.Authorization || '';

      return {
        dbConnection,
        auth,
        res,
        req,
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  app.use(cookieParser());

  app.use((req, res, next) => {
    const accessToken = req.cookies['access-token'];

    try{
      const data = verifyAccessToken(accessToken, ACCESS_TOKEN_SECRET);
      req.userId = data.id;
    } catch {

    }
    

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
