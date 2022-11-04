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

export const signin = async (_, { userName, password }, { res }) => {
  const user = await User.findOne({
    userName: userName.toLowerCase(),
  }).exec();

  if (!user || !user.id) {
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
    accessToken: accessToken,
    user,
  };
};

export const signup = async (_, { userInput }) => {
  const registrationInput = JSON.parse(JSON.stringify(userInput));

  const userByUserName = await User.findOne({
    userName: registrationInput.userName.toLowerCase(),
  }).exec();

  if (userByUserName) {
    throwCustomError(
      `Username ${registrationInput.userName} is already taken`,
      {
        ref: 'username',
      }
    );
  }

  const userByEmail = await User.findOne({
    email: registrationInput.email.toLowerCase(),
  }).exec();

  if (userByEmail) {
    throwCustomError(`email ${registrationInput.email} is already registered`, {
      ref: 'email',
    });
  }

  const passwordHash = await argon2.hash(registrationInput.password);

  const user = new User({
    userName: registrationInput.userName.toLowerCase(),
    password: passwordHash,
    email: registrationInput.email.toLowerCase(),
    name: registrationInput.name,
    tokenVersion: 0,
    verified: false,
  });

  await user.save().catch((err) => {
    console.log(err);
    return false;
  });

  sendVerificationToken(
    {
      user: registrationInput.userName,
      email: registrationInput.email,
    },
    GMAIL_API_KEY,
    '1d'
  );

  return true;
};

export const verifyUser = async (_, { token }) => {
  try {
    const { user } = jwt.verify(token, GMAIL_API_KEY);
    await User.findOneAndUpdate({ userName: user }, { verified: true });
  } catch (e) {
    const { user, email } = jwt.decode(token, GMAIL_API_KEY);

    if (!user || !email) {
      throwCustomError('Cannot decode token', { code: 'token' });
    }

    sendVerificationToken({ user: user, email: email }, GMAIL_API_KEY, '1d');

    return false;
  }
  return true;
};

export const invalidateTokens = async (_, _params, { req }) => {
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

  // res.clearCookie('access-token')

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

  return {accessToken: accessToken};
};

// export const deleteUser = async (_, { userName }) => {
//   return (await User.deleteOne({ userName: userName })).deletedCount;
// };
