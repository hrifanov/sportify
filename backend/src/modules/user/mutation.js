import * as argon2 from 'argon2';
import { createAccessToken, createRefreshToken } from '../../libs/auth';
import User from '../../models/User';

export const signin = async (_, { userName, password }, { res }) => {
  const user = await User.findOne({
    userName: userName.toLowerCase(),
  }).exec();

  if (!user || !user.id) {
    throw new Error('could not find user');
  }

  const valid = await argon2.verify(user.password, password);

  if (!valid) {
    throw new Error('bad password');
  }

  res.cookie('jid', createRefreshToken(user), {
    httpOnly: true,
    path: '/refresh_token',
  });

  return {
    accessToken: createAccessToken(user),
    user,
  };
};

export const signup = async (_, { userInput }) => {
  const parsedUserInput = JSON.parse(JSON.stringify(userInput));

  const userByUserName = await User.findOne({
    userName: parsedUserInput.userName.toLowerCase(),
  }).exec();

  if (userByUserName) {
    throw new Error('Username already taken');
  }

  const userByEmail = await User.findOne({
    email: parsedUserInput.email.toLowerCase(),
  }).exec();

  if (userByEmail) {
    throw new Error('Email already registered');
  }

  const passwordHash = await argon2.hash(parsedUserInput.password);

  const user = new User({
    userName: parsedUserInput.userName.toLowerCase(),
    password: passwordHash,
    email: parsedUserInput.email.toLowerCase(),
    name: parsedUserInput.name,
    tokenSum: 0,
  });

  await user.save().catch((err) => {
    console.log(err);
    return false;
  });

  return true;
};

export const invalidateTokens = async (_, __, { req }) => {
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

// export const deleteUser = async (_, { userName }) => {
//   return (await User.deleteOne({ userName: userName })).deletedCount;
// };
