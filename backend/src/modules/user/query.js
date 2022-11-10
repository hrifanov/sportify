import { GMAIL_API_KEY } from '../../config/variables';
import { verifyToken } from '../../libs/auth';
import { isAuth } from '../../libs/isAuth';
const User = require('../../models/User');

//TODO: refactor isAuth as middleware

export const users = async (_, _params, context) => {
  isAuth(context);
  return await User.find();
};

export const user = async (_, { userName }, context) => {
  isAuth(context);

  return User.findOne({ userName });
};

export const doesInvitationUserExist = async (_, { token }, context) => {
  isAuth(context);

  try {
    const { email } = verifyToken(token, GMAIL_API_KEY);
    const user = await User.findOne({ email: email });
    return !!user;
  } catch (err) {
    return false;
  }
};
