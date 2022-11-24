import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { PORT } from './config/variables';
import { getConnection } from './libs/connection';
import { schema } from './modules/executableSchema';

(async () => {
  const app = express();

  app.disable('x-powered-by');

  app.use(cors());

  app.use(cookieParser());

  app.get('/', (_, res) => res.redirect('/graphql'));

  const client = await getConnection();

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }) => ({ client, req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.info(`🚀 Server started at http://localhost:${PORT}/graphql`);
  });
})();
