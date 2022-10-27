import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { PORT } from './config/variables';
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from './libs/auth';
import { getConnection } from './libs/connection';
import User from './models/User';
import { schema } from './modules/executableSchema';

const startServer = async () => {
  const app = express();

  app.disable('x-powered-by');

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.get('/', (_, res) => res.redirect('/graphql'));

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }

    let payload = null;
    try {
      payload = verifyToken(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: '' });
    }

    // token is valid and
    // we can send back an access token
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    if (user.count !== payload.count) {
      return res.send({ ok: false, accessToken: '' });
    }

    res.cookie('jid', createRefreshToken(user), {
      httpOnly: true,
      path: '/refresh_token',
    });

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  await getConnection();

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  const port = PORT || 4000;

  app.listen(port, () => {
    console.info(`🚀 Server started at http://localhost:${port}/graphql`);
  });
};

startServer();
