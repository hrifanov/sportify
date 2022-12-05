import jwt, { sign } from 'jsonwebtoken';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  FE_HOSTNAME,
  GMAIL_API_KEY,
} from '../../config/variables';
import { createGmailTransporter, sendMail } from './mail';

export const createAccessToken = (user) => {
  return sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
    expiresIn: '7d',
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

    const url = `http://${FE_HOSTNAME}/${route}/${emailToken}`;

    const transporter = createGmailTransporter();
    const html = mailOptions.html.split('{url}').join(url);

    try {
      sendMail(transporter, {
        ...mailOptions,
        html,
      });
    } catch (e) {
      console.error(e);
    }
  });
};
