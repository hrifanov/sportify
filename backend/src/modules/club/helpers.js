import User from '../../models/User.js';

export const removeInvalidPlayersFromClub = async (club) => {
  const { players } = club;
  const promises = players.map(async (player) => {
    const user = await User.findById(player.user);
    if (!user) {
      return null;
    }
    return player;
  });
  const filteredPlayers = await Promise.all(promises);
  club.players = filteredPlayers.filter((player) => player !== null);
  await club.save();
}
