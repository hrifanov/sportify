import { isAuth } from '../../libs/isAuth';

const User = require('../../models/User');

//TODO: refactor isAuth as middleware

export const users = async (_, _params, context) => {
  isAuth(context);
  return await User.find();
};

export const user = async (_, { userName }, context) => {
  isAuth(context);

  return User.findOne({ userName: userName });
};
