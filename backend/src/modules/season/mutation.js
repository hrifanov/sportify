import Season  from '../../models/Season';
import { isAuth } from '../../libs/isAuth';
import formatSeason from './formatSeason';


export const createSeason = async (_, { createSeasonInput }, context) => {
    isAuth(context);
    const { name: nameInput, dateStart: dateStartInput, dateEnd: dateEndInput } = createSeasonInput;
    const dateStart = new Date(dateStartInput);
    const dateEnd = new Date(dateEndInput);
    
    const season = await Season.create({
        name: nameInput,
        dateStart,
        dateEnd
    });

    return formatSeason(season);
}

export const deleteSeason = async (_, { seasonId }, context) => {
    isAuth(context);
    // TODO: better security check
    const result = await Season.deleteOne({ _id: seasonId });
    return true;
}