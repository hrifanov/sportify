import { matchTypeDef } from './schemas/matchSchema';
import { teamPlayerTypeDef } from './schemas/teamPlayerSchema';
import * as queries from './query';
import * as mutations from './mutation';
import Club from '../../models/Club';
import User from '../../models/User';
import Event from '../../models/Event';
import Season from '../../models/Season';
import TeamPlayer from '../../models/TeamPlayer';
import formatSeason from '../season/formatSeason';
import { getUserStatisticsForMatch } from '../user/statistics.js';

export { matchTypeDef, teamPlayerTypeDef, resolvers };

const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
  Match: {
    async club(parent) {
      return await Club.findById(parent.club);
    },
    async season(parent) {
      const season = await Season.findById(parent.season);
      return formatSeason(season);
    },
    async events(parent) {
      return Event.find({ matchId: parent.id });
    },
    async statistics(parent) {
      const mapTeam = teamId => parent.teams[teamId].teamPlayers.map(async (teamPlayerId) => {
        const teamPlayer = await TeamPlayer.findById(teamPlayerId)
        const user = await User.findById(teamPlayer.user);

        return {
          user: user,
          teamId,
          statistics: getUserStatisticsForMatch(user.id, parent.id)
        }
      })

      return [
        ...mapTeam('home'),
        ...mapTeam('guest')
      ]
    }
  },
  Team: {
    async teamPlayers(parent) {
      return await TeamPlayer.find({ _id: { $in: parent.teamPlayers } });
    },
  },
  TeamPlayer: {
    async user(parent) {
      return await User.findById(parent.user);
    },
  }
};
