import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { MOCKS, PORT } from './config/variables';
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
    context: async ({ req }) => {
      const auth = req.headers.Authorization || '';

      return {
        dbConnection,
        auth,
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  const port = PORT || 4000;

  app.get('/', (_, res) => res.redirect('/graphql'));

  app.listen(port, () => {
    console.info(`✅ Server started at http://localhost:${port}/graphql`);
  });
};
  
startServer();
