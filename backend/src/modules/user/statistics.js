import merge from 'lodash.merge';

import { isAuth } from "../../libs/isAuth";
import Match from "../../models/Match";
import TeamPlayer from "../../models/TeamPlayer";
import { throwCustomError } from '../../libs/error';

export const getUserStatisticsForMatch = async (user, { matchId }, context) => {
    isAuth(context);
    const match = await Match.findById(matchId);
    const isInMatch = await isPlayerInMatch(user.id, match);
    if(!isInMatch) throwCustomError('User is not in this match.', { code: 'user-not-in-match' });
    return ""

}

const isPlayerInMatch = async (userId, match) => {
    const playerIds = [];
    // Check home players
    for(const player of match.teams.home.teamPlayers){
        playerIds.push(player.id.toString("hex"));
    }
    // Check guest players
    for(const player of match.teams.guest.teamPlayers){
        playerIds.push(player.id.toString("hex"));
    }
    const teamPlayers = await TeamPlayer.find({"_id":{ $in: playerIds}});
    for(const teamPlayer of teamPlayers){
        if(userId == teamPlayer.user.id.toString("hex")){
            return true;
        }
    }
    return false;
    
}