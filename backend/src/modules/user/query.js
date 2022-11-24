import { GMAIL_API_KEY } from '../../config/variables';
import { verifyToken } from '../../libs/auth';
import { throwCustomError } from '../../libs/error';
import { isAuth } from '../../libs/isAuth';
const User = require('../../models/User');
const Club = require('../../models/Club');

//TODO: refactor isAuth as middleware

export const users = async (_, _params, context) => {
  isAuth(context);
  return await User.find();
};

export const user = async (_, { userName }, context) => {
  isAuth(context);

  return User.findOne({ userName });
};

// export const invitationDetail = async (_, { token }, context) => {
//   isAuth(context);
export const invitationDetail = async (_, { token }) => {
  try {
    const { clubId, email } = verifyToken(token, GMAIL_API_KEY);

    const { name } = await Club.findOne({ id: clubId }).select('name');
    const user = await User.findOne({ email });

    return { clubName: name, email, doesUserExist: !!user };
  } catch (err) {
    console.error(err);
    throwCustomError('Provided token is not valid', { code: 'invalid-token' });
  }
};
