import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { GMAIL_API_KEY } from '../../config/variables';
import {
  createAccessToken,
  createRefreshToken,
  sendVerificationToken,
  verifyToken,
} from '../../libs/auth';
import { throwCustomError } from '../../libs/error';
import User from '../../models/User';
import { isAuth } from '../../libs/isAuth';

export const signin = async (_, { userName, password }, { res }) => {
  const user = await User.findOne({ userName: userName.toLowerCase() });

  if (!user) {
    throwCustomError(`Could not find user ${userName}`, { ref: 'username' });
  }

  if (!user.verified) {
    throwCustomError('Please verify your email first to login', {
      ref: 'email',
    });
  }

  const valid = await argon2.verify(user.password, password);

  if (!valid) {
    throwCustomError('Bad password, please try again', { ref: 'password' });
  }

  res.cookie('jid', createRefreshToken(user), {
    httpOnly: true,
  });

  const accessToken = createAccessToken(user);
  res.cookie('access-token', accessToken, {
    httpOnly: true,
  });

  return {
    accessToken: createAccessToken(user),
    user,
  };
};

export const signup = async (_, { userInput }) => {
  const { userName, email, password, name } = userInput;

  const existingUserByUsername = await User.findOne({
    userName: userName.toLowerCase(),
  });
  if (existingUserByUsername) {
    throwCustomError(`username ${userName} is already taken`, {
      ref: 'username',
    });
  }

  const existingUserByEmail = await User.findOne({
    email: email.toLowerCase(),
  });
  if (existingUserByEmail) {
    throwCustomError(`email ${email} is already registered`, {
      ref: 'email',
    });
  }

  const user = new User({
    userName: userName.toLowerCase(),
    password: await argon2.hash(password),
    email: email.toLowerCase(),
    name: name,
    tokenVersion: 0,
    verified: false,
  });

  await user.save().catch((err) => {
    console.log(err);
    return false;
  });

  sendVerificationToken(
    {
      user: userName.toLowerCase(),
      email,
    },
    'verify-account',
    {
      to: email,
      subject: 'Please confirm your registration',
      html: `Hi ${userName},<br><br>Thank you for your registration.<br><br>Please confirm your email by clicking the link below.<br><a href='{url}'>{url}</a><br><br>Thanks,<br>The Sportify Team`,
    },
  );

  return true;
};

export const verifyUser = async (_, { token }) => {
  try {
    const { user } = jwt.verify(token, GMAIL_API_KEY);
    await User.findOneAndUpdate({ userName: user }, { verified: true });
  } catch (err) {
    console.error(err);

    const { user, email } = jwt.decode(token, GMAIL_API_KEY);
    if (!user || !email) {
      throwCustomError('Cannot decode token', { code: 'token' });
    }

    sendVerificationToken({ user, email }, GMAIL_API_KEY, '1d');
    return false;
  }
  return true;
};

export const invalidateTokens = async (_, _params, { req, res }, context) => {
  isAuth(context);

  if (!req.userId) {
    return false;
  }

  // TODO: user update
  const user = await User.findOne(req.userId);
  if (!user) {
    return false;
  }
  user.count += 1;
  await user.save();

  res.clearCookie('access-token');
  res.clearCookie('jid');

  return true;
};

export const refreshToken = async (_, _params, { req, res }) => {
  if (!req.cookies.jid) {
    throwCustomError('Missing refresh token', { code: 'refresh-token' });
  }

  let payload = null;
  try {
    payload = verifyToken(req.cookies.jid, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    throwCustomError('Invalid refresh token', { code: 'refresh-token' });
  }

  // token is valid and
  // we can send back an access token
  const user = await User.findOne({ id: payload.userId });

  if (!user) {
    throwCustomError('Invalid refresh token', { code: 'refresh-token' });
  }

  if (user.count !== payload.count) {
    throwCustomError('Invalid version of refresh token', {
      code: 'refresh-token',
    });
  }

  res.cookie('jid', createRefreshToken(user), {
    httpOnly: true,
  });

  const accessToken = createAccessToken(user);

  res.cookie('access-token', accessToken, {
    httpOnly: true,
  });

  return { accessToken };
};

export const forgottenPassword = async (_, { username }) => {
  const user = await User.findOne({ userName: username.toLowerCase() });

  if (!user) {
    throwCustomError(`User ${username} does not exist`, { ref: 'username' });
  }

  sendVerificationToken(
    {
      user: username,
      email: user.email,
    },
    'reset-password',
    {
      to: user.email,
      subject: 'Reset your password',
      html: `Hi ${username},<br><br>Click on the link below to reset your password.<br><a href='{url}'>{url}</a><br><br>Thanks,<br>The Sportify Team`,
    },
  );
  return true;
};

export const resetPassword = async (_, { token, password }) => {
  try {
    const { user } = jwt.verify(token, GMAIL_API_KEY);
    const hashedPassword = await argon2.hash(password);
    await User.findOneAndUpdate(
      { userName: user },
      { password: hashedPassword },
    );
    return true;
  } catch (err) {
    throwCustomError('Cannot decode token', { code: 'token' });
    return false;
  }
};
