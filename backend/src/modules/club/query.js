import { isAuth } from '../../libs/isAuth';
const Club = require('../../models/Club');

//TODO: refactor isAuth as middleware

export const clubs = async (_, _params, context) => {
  isAuth(context);
  return await Club.find();
};

export const club_by_owner = async (_, { owner_id }, context) => {
  isAuth(context);
  return await Club.findOne({ owner: owner_id });
};

export const club_by_id = async (_, { id }, context) => {
  isAuth(context);
  return await Club.findOne({ id: id });
};
