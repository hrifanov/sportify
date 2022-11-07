import jwt, { sign } from 'jsonwebtoken';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  NODE_ENV,
  FE_HOSTNAME_DEV,
  FE_HOSTNAME_PROD,
  GMAIL_API_KEY,
} from '../config/variables';
import { createGmailTransporter, sendMail } from './mail';

export const createAccessToken = (user) => {
  return sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

export const createRefreshToken = (user) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  );
};

export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

export const sendVerificationToken = (auth, route, mailOptions) => {
  jwt.sign(auth, GMAIL_API_KEY, { expiresIn: '1d' }, (err, emailToken) => {
    if (err) {
      console.error(err);
      return false;
    }

    const hostname =
      NODE_ENV === 'development' ? FE_HOSTNAME_DEV : FE_HOSTNAME_PROD;
    const url = `http://${hostname}/${route}/${emailToken}`;

    const transporter = createGmailTransporter();
    const html = mailOptions.html.replaceAll('{url}', url);
    try {
      sendMail(transporter, {
        ...mailOptions,
        html: html,
      });
    } catch (e) {
      console.error(e);
    }
  });
};
