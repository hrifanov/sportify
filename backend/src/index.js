import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { PORT } from './config/variables';
import { createAccessToken, createRefreshToken } from './libs/auth';
import { getConnection } from './libs/connection';
import { verifyToken } from './libs/auth';
import User from './models/User';
import { schema } from './modules/executableSchema';

const startServer = async () => {
  const app = express();

  app.disable('x-powered-by');

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
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

  // app.use(async (req, res, next) => {
  //   const refreshToken = req.cookies['refresh-token'];
  //   const accessToken = req.cookies['access-token'];

  //   // missing tokens
  //   if (!refreshToken && !accessToken) {
  //     return next();
  //   }

  //   try {
  //     // access token is valid
  //     const data = verifyToken(accessToken, ACCESS_TOKEN_SECRET);
  //     req.userId = data.id;
  //     return next();
  //   } catch {
  //     console.error('access token not valid');
  //   }

  //   // missing refresh token
  //   if (!refreshToken) {
  //     return next();
  //   }

  //   let data;

  //   try {
  //     data = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);
  //   } catch {
  //     console.error('refresh token not valid');
  //     return next();
  //   }

  //   const user = await User.findOne({ id: data.userId });

  //   // invalidated token
  //   if (!user || user.count !== data.count) {
  //     return next();
  //   }

  //   const tokens = createTokens(user);

  //   res.cookie('refresh-token', tokens.refreshToken);
  //   res.cookie('access-token', tokens.accessToken);
  //   req.userId = user.id;

  //   next();
  // });
};

startServer();
