import Season  from '../../models/Season';
import { isAuth } from '../../libs/isAuth';
import formatSeason from './formatSeason';


export const createSeason = async (_, { createSeasonInput }, context) => {
    isAuth(context);
    const season = await Season.create(createSeasonInput);

    return formatSeason(season);
}

export const deleteSeason = async (_, { seasonId }, context) => {
    isAuth(context);
    // TODO: better security check
    await Season.deleteOne({ _id: seasonId });
    return true;
}
