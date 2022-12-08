import { isAuth } from '../../libs/isAuth';
import Application from '../../models/Application';

export const applications = async (_, { clubId }, context) => {
  isAuth(context);
  return await Application.find({club: clubId, state:"pending"});
};