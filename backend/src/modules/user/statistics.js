import Match from '../../models/Match';
import TeamPlayer from '../../models/TeamPlayer';
import Event from '../../models/Event';
import { throwCustomError } from '../../libs/error';


/**
 * GraphQL resolver for fetching player statistics in single match.
 *
 * @param {Number} userId
 * @param {Number} matchId
 * @returns Summary of all actions in a match for given player.
 */
export const getUserStatisticsForMatch = async (userId, matchId) => {
  const match = await Match.findById(matchId);
  const playerTeamRole = await getPlayerRole(userId, match);

  if (!playerTeamRole)
    throwCustomError('User is not in this match.', {
      code: 'user-not-in-match',
    });
  const events = await Event.find({ matchId: matchId });

  let summary = addCanadianPoints(await getPlayerEventSummary(userId, events, playerTeamRole, match.shots, match.score));
  summary.roles = [playerTeamRole.role];

  return summary;
};


/**
 * GraphQL resolver for fetching player statistics within whole season in one team.
 *
 * @param {Number} userId
 * @param {Number} clubId
 * @param {Number} seasonId
 * @returns Summary of all actions within whole season in one team.
 */
export const getUserStatisticsForTeam = async (userId, clubId, seasonId ) => {
  const matches = await Match.find({club: clubId, season: seasonId});
  let summary = createEmptySummary();

  const rolesSet = new Set();
  for(const match of matches){
    const events = await Event.find({ matchId: match.id });
    if(!events || events.length == 0) continue;
    const matchRole = await getPlayerRole(userId, match);
    if(!matchRole) continue;
    rolesSet.add(matchRole.role);
    
    const eventDocs = await Event.find({matchId: match.id});
    const matchSummary = await getPlayerEventSummary(userId, eventDocs, matchRole, match.shots, match.score);
    summary = addSumaries(summary, matchSummary);
  }
  summary = addCanadianPoints(summary);
  summary.roles = Array.from(rolesSet);
  return summary;
}


/**
 * If player is in the match then returns its role and team side.
 *
 * @param {ObjectId} userId
 * @param {Match} match
 * @returns Object with keys "role" and "teamSide", or null if player is not in the match.
 */
const getPlayerRole = async (userId, match) => {
  // Check home players
  const homePlayerIds = [];
  for (const player of match.teams.home.teamPlayers) {
    homePlayerIds.push(player.id.toString('hex'));
  }
  const homeTeamPlayers = await TeamPlayer.find({ _id: { $in: homePlayerIds } });
  for (const teamPlayer of homeTeamPlayers) {
    if (userId == teamPlayer.user.id.toString('hex')) {
      return {
        role: teamPlayer.role,
        teamSide: "home"
      };
    }
  }
  // Check guest players
  const guestPlayerIds = [];
  for (const player of match.teams.guest.teamPlayers) {
    guestPlayerIds.push(player.id.toString('hex'));
  }
  const guestTeamPlayers = await TeamPlayer.find({ _id: { $in: guestPlayerIds } });
  for (const teamPlayer of guestTeamPlayers) {
    if (userId == teamPlayer.user.id.toString('hex')) {
      return {
        role: teamPlayer.role,
        teamSide: "guest"
      };
    }
  }
  return null;
};


/**
 * Returns new empty summary record with zeros.
 *
 * @returns Object with keys "goals", "assists", "penalties", "totalPenaltiesLength", "goalsSaved", "goalsPassed".
 */
const createEmptySummary = () => ({
  goals: 0,
  assists: 0,
  penalties: 0,
  totalPenaltiesLength: 0,
  goalsSaved: 0,
  goalsPassed: 0,
  gamesAttacker: 0,
  gamesGoalkeeper: 0,
  gamesTotal: 0,
  winsTotal: 0,
  matchesWithoutPassedGoals: 0
});


/**
 * Creates new summary object out of two summaries by their sum.
 * @param {Object} sum1
 * @param {Object} sum2
 * @returns New summary object.
 */
const addSumaries = (sum1, sum2) => {
  const summary = {};
  for(const key of Object.keys(sum1)){
    summary[key] = sum1[key] + sum2[key];
  }
  return summary;
};


/**
 * Counts canadian points and their average and creates new summary object containg those two additional attributes.
 * @param {Object} summary
 * @returns New summary object.
 */
const addCanadianPoints = (summary) => ({
  canadianPoints: summary.goals + summary.assists,
  avgCanadianPoints: !summary.gamesAttacker
    ? 0
    : (summary.goals + summary.assists)/summary.gamesAttacker,
  ...summary
});


/**
 * Analyzies given events and returns sums of events that are associated with player.
 *
 * @param {ObjectId} userId ID of user.
 * @param {Event[]} events Array of events that need to be summarized.
 * @param {Object} teamRole Object with keys "role" and "teamSide".
 * @param {Object} shots Object with numbers of shots under keys "home" and "guest".
 * @returns Promise - Object containing number of goals, assists, penalties and their lengths, and for goalkeeper saved and passed shots.
 */
const getPlayerEventSummary = async (userId, events, teamRole, shots, score) => {
  return new Promise((resolve) => {
    const summary = createEmptySummary();
    for (const event of events) {
      switch(event.type){
        case "goal": {
          const goalResult = processGoalEvent(userId, event, teamRole);
          summary.goals += goalResult.goals;
          summary.assists += goalResult.assists;
          summary.goalsPassed += goalResult.goalsPassed;
          break;
        }
        case "penalty": {
          const penaltyResult = processPenaltyEvent(userId, event);
          summary.penalties += penaltyResult.penalty;
          summary.totalPenaltiesLength += penaltyResult.length;
          break;
        }
        default: {
          continue;
        }
      }
    }
    const opponentSide = teamRole.teamSide == "home" ? "guest" : "home";
    if(teamRole.role == "goalkeeper"){
      summary.goalsSaved = shots[opponentSide] - summary.goalsPassed;
      if(summary.goalsPassed == 0){
        summary.matchesWithoutPassedGoals = 1
      }
      summary.gamesGoalkeeper = 1;
    } else summary.gamesAttacker = 1;
    if(score[teamRole.teamSide] > score[opponentSide]){
      summary.winsTotal = 1;
    }
    summary.gamesTotal = 1;
    resolve(summary);
  });
};


/**
 * Returns object containg data about goal if the goal is associated with player.
 *
 * @param {ObjectId} userId
 * @param {Event} event
 * @param {Object} teamRole
 * @returns Object with number of goals, assists and not saved shots.
 */
const processGoalEvent = (userId, event, teamRole) => {
  const result = {
    goals: 0,
    assists: 0,
    goalsPassed: 0
  }
  if(event.data.playerId == userId) result.goals = 1;
  if(event.data.assistId == userId || event.data.secondAssistId == userId) result.assists = 1;
  if(teamRole.role == "goalkeeper" && event.data.teamId != teamRole.teamSide){
    result.goalsPassed = 1;
  }
  return result;
}


/**
 * Returns object that contains 1 penalty record and length of that penalty
 * if given event is associated with player in params.
 *
 * @param {ObjectId} userId
 * @param {Event} event
 * @returns
 */
const processPenaltyEvent = (userId, event) => {
  const result = {
    penalty: 0,
    length: 0
  }
  if(event.data.playerId == userId){
    result.penalty = 1;
    result.length = getPenaltyLength(event.data.length);
  }
  return result;
}

/**
 * Penalties can be in two forms either as single number or sum of two numbers.
 * This function handles both cases and returns single number for given length string.
 * 
 * @param {string} lengthString 
 * @returns length of a penalty in minutes
 */
const getPenaltyLength = (lengthString) => {
  const parts = lengthString.split("+");
  let summedLength = 0;
  for(const len of parts){
    const num = Number.parseFloat(len);
    if(isNaN(num)) continue;
    summedLength += num;
  }
  return summedLength;
}
