import Match from '../../models/Match';
import TeamPlayer from '../../models/TeamPlayer';
import Event from '../../models/Event';
import Club from '../../models/Club';
import { throwCustomError } from '../../libs/error';
import User from '../../models/User';


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
    if(!events || events.length === 0) continue;
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
 * Counts statistics of all player in club for given season.
 *
 * @param {import('mongoose').ObjectId} clubId
 * @param {import('mongoose').ObjectId} seasonId
 * @returns {Promise<PlayerStatistic[]>} Array of `PlayerStatistics` from GraphQL schema.
 */
export const getTeamStatistics = async (clubId, seasonId) => {
  // Get club
  const club = await Club.findById(clubId);
  // Get IDs of club members
  const members = club.players.map(player => player.user);
  // Create dictionary of members and their empty stats
  const membersStats = Object.fromEntries(members.map(memberId => [memberId, createEmptySummary()]));
  // Create mapping of TeamPlayers onto club members
  const teamPlayers = await TeamPlayer.find({ user: { $in: members } });
  const teamPlayersMap = Object.fromEntries(teamPlayers.map(teamPlayer => [teamPlayer.id, {
    userId: teamPlayer.user,
    role: teamPlayer.role
  }]));
  // Get all events for each match in season
  const matchesMap = await getMatchesWithEvents(clubId, seasonId);
  // Process each match
  for(const match of Object.values(matchesMap)){
    processMatchPlayers(match, teamPlayersMap, membersStats);
  }

  const users = await User.find({ _id: { $in: members } });
  const usersIdMap = Object.fromEntries(users.map(user => [user.id, {...user._doc, id: user._doc._id }]));

  return Object.entries(membersStats).map(([userId, stats]) => ({
    user: usersIdMap[userId],
    statistics: addCanadianPoints(stats)
  }));

}

/**
 * Fetches all matches for given team in single season and appends their events to the
 * Match object instance.
 *
 * @param {import('mongoose').ObjectId} clubId
 * @param {import('mongoose').ObjectId} seasonId
 * @returns {Object} Object where keys are matchIds and values are instances of `Match` with
 * attached `Event` array as `event` attribute.
 */
const getMatchesWithEvents = async (clubId, seasonId) => {
  // Get matches for club and season
  const matches = await Match.find({club: clubId, season: seasonId});
  // Get all events for each match in season
  const matchesMap = Object.fromEntries(matches.map(match => [match.id, {...match._doc}]))
  const events = await Event.find({ matchId: { $in: Object.keys(matchesMap) }});
  // Split events by matches
  for(const event of events){
    const matchId = event.matchId.toString();
    if(!matchesMap[matchId].events){
      matchesMap[matchId].events = [];
    }
    matchesMap[matchId].events.push(event)
  }

  return matchesMap
}


/**
 * Runs through everything that happend in a game and updates player statistics.
 *
 * @param {Match} match Instance of `Match` object.
 * @param {Object} teamPlayersMap Object with userIds as keys and
 * instances of `TeamPlayer` as values.
 * @param {Object} membersStats Object with userIds as keys and matchSummaries as values.
 */
const processMatchPlayers = async (match, teamPlayersMap, membersStats) => {
  // Storing goalkeepers for match
  const goalkeepers = {
    home: null,
    guest: null
  }
  // Storing number of goals goalkeeper didn't save.
  const goalkeeperPassedGoals = {
    home: 0,
    guest: 0
  }
  // Evaluate what side won the match.
  const winnersSide = getWinnersSide(match.score.home, match.score.guest);

  // Processing each player.
  // Process home players.
  processTotalGamesForTeamPlayers(match.teams, "home", goalkeepers, winnersSide, teamPlayersMap, membersStats);
  // Process away players.
  processTotalGamesForTeamPlayers(match.teams, "guest", goalkeepers, winnersSide, teamPlayersMap, membersStats);
  // Process each event.
  for(const event of match.events){
    processEvent(event, membersStats, goalkeepers, goalkeeperPassedGoals, teamPlayersMap, match.teams);
  }
  
  countStatsForGoalkeepers(goalkeepers, goalkeeperPassedGoals, match.shots, membersStats);
}

/**
 * 
 * @param {Object} teams Object with keys `home` and `guest`.
 * @param {string} side Match team for currently processed players. Value must be `home` or `guest`.
 * @param {Object} goalkeepers Object with keys `home` and `guest`
 * where values are userIds of goalkeepers for given match.
 * @param {string} winnerSide What side has won the match. Values must be `home` or `guest` or `draw`.
 * @param {Object} teamPlayersMap Object with userIds as keys and
 * instances of `TeamPlayer` as values.
 * @param {Object} membersStats Object with userIds as keys and matchSummaries as values.
 */
const processTotalGamesForTeamPlayers = (teams, side, goalkeepers, winnerSide, teamPlayersMap, membersStats) => {
  // For all players on current side
  for(const player of teams[side].teamPlayers){
    // Get TeamPlayer instance for teamPlayerId in player
    const teamPlayer = teamPlayersMap[player.toString()];
    if (!teamPlayer) continue;

    if(teamPlayer.role === "goalkeeper"){
      if(!membersStats[teamPlayer.userId].roles.includes("goalkeeper")) {
        membersStats[teamPlayer.userId].roles.push("goalkeeper");
      }
      membersStats[teamPlayer.userId].gamesGoalkeeper++;
      goalkeepers[side] = teamPlayer.userId;
    } else {
      if(!membersStats[teamPlayer.userId].roles.includes("attack")) {
        membersStats[teamPlayer.userId].roles.push("attack");
      }
      membersStats[teamPlayer.userId].gamesAttacker++;
    }
    if(winnerSide === side) membersStats[teamPlayer.userId].winsTotal++;
    else if(winnerSide === "draw") membersStats[teamPlayer.userId].draws++;
    membersStats[teamPlayer.userId].gamesTotal++;
  }
}


/**
 * Counts for both goalkeepers how many goals they saved and updates their statistics.
 *
 * @param {Object} goalkeeperUsers Object with keys `home` and `away`
 * where values are userIds of goalkeepers for given match.
 * @param {Object} passedGoals Object with keys `home` and `away`
 * where values are sums of goals of opossite side.
 * @param {Object} shots Object with keys `home` and `away`
 * where values are sums of shots for given side.
 * @param {Object} membersStats Object with userIds as keys and matchSummaries as values.
 */
const countStatsForGoalkeepers = (goalkeeperUsers, passedGoals, shots, membersStats) => {
  // Count saved goals for goalkeepers
  if(goalkeeperUsers.home){
    membersStats[goalkeeperUsers.home].goalsPassed += passedGoals.home;
    membersStats[goalkeeperUsers.home].goalsSaved += shots.guest - passedGoals.home;
    if(passedGoals.home === 0){
      membersStats[goalkeeperUsers.home].matchesWithoutPassedGoals++;
    }
  }
  if(goalkeeperUsers.guest){
    membersStats[goalkeeperUsers.guest].goalsPassed += passedGoals.guest;
    membersStats[goalkeeperUsers.guest].goalsSaved += shots.home - passedGoals.guest;
    if(passedGoals.guest === 0){
      membersStats[goalkeeperUsers.guest].matchesWithoutPassedGoals++;
    }
  }
}


/**
 * Processes single events and updates statistics of all players involved in event.
 *
 * @param {Event} event Instance of `Event`.
 * @param {Object} membersStats Object with userIds as keys and matchSummaries as values.
 * @param {Object} goalkeeperUsers Object with keys `home` and `away`
 * where values are userIds of goalkeepers for given match.
 * @param {Object} passedGoals Object with keys `home` and `away`
 * where values are sums of goals of opossite side.
 * @param {Object} teamPlayersMap Object with userIds as keys and
 * instances of `TeamPlayer` as values.
 * @param {Object} teams Instance of `Team` object from `Match`
 */
const processEvent = (event, membersStats, goalkeeperUsers, passedGoals, teamPlayersMap, teams) => {
  if(event.type === "goal"){
    // Add goal to player
    if(membersStats[event.data.playerId]) membersStats[event.data.playerId].goals++;
    // Add assists to players
    if(membersStats[event.data.assistId]) membersStats[event.data.assistId].assists++;
    if(membersStats[event.data.secondAssistId]) membersStats[event.data.secondAssistId].assists++;
    // Add passed goals to goalkeeper
    // Find scoring side
    let isGoalFromHomeSide = false;
    for(const teamPlayer of teams.home.teamPlayers){
      if(teamPlayersMap[teamPlayer].userId.toString('hex') === event.data.playerId){
        isGoalFromHomeSide = true;
        break;
      }
    }
    
    // Find goalkeeper of opposide side
    const goalkeeperSide = isGoalFromHomeSide ? "guest" : "home";
    passedGoals[goalkeeperSide]++;

  }
  if(event.type === "penalty"){
    if(membersStats[event.data.playerId]) membersStats[event.data.playerId].penalties++;
    if(membersStats[event.data.playerId]) membersStats[event.data.playerId].totalPenaltiesLength += getPenaltyLength(event.data.length);
  }
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
    if (userId === teamPlayer.user.id.toString('hex')) {
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
    if (userId === teamPlayer.user.id.toString('hex')) {
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
  matchesWithoutPassedGoals: 0,
  roles: [],
  draws: 0
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
 *
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
    const opponentSide = teamRole.teamSide === "home" ? "guest" : "home";
    if(teamRole.role === "goalkeeper"){
      summary.goalsSaved = shots[opponentSide] - summary.goalsPassed;
      if(summary.goalsPassed === 0){
        summary.matchesWithoutPassedGoals = 1
      }
      summary.gamesGoalkeeper = 1;
    } else summary.gamesAttacker = 1;
    if(score[teamRole.teamSide] > score[opponentSide]){
      summary.winsTotal = 1;
    } else if(score[teamRole.teamSide] === score[opponentSide]){
      summary.draws = 1
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
  if(event.data.playerId === userId) result.goals = 1;
  if(event.data.assistId === userId || event.data.secondAssistId === userId) result.assists = 1;
  if(teamRole.role === "goalkeeper" && event.data.teamId !== teamRole.teamSide){
    result.goalsPassed = 1;
  }
  return result;
}

/**
 * Gets the side that has won the match or return if draw has happened.
 * 
 * @param {number} scoreHome Score of home team
 * @param {number} scoreGuest Score of guest team
 * @returns `home` if home side won, `guest` if guest side won or `draw` if both scores are equal.
 */
const getWinnersSide = (scoreHome, scoreGuest) => {
  if(scoreHome === scoreGuest) return "draw";
  return scoreHome > scoreGuest ? "home" : "guest";
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
  if(event.data.playerId === userId){
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
