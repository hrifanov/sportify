import { isAuth } from '../../libs/isAuth';
import Season from '../../models/Season';
import formatSeason from './formatSeason';

export const seasons = async (_, __, context) => {
    isAuth(context);
    const seasons = await Season.find();
    return seasons.map((row) => formatSeason(row.toObject()));
}

export const season = async(_, { seasonId }, context) => {
    isAuth(context);
    const season = (await Season.findById(seasonId)).toObject();
    return formatSeason(season);
}