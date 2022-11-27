export function teamsColumns(players) {
  return [
    {
      id: 0,
      name: 'Home Team',
      items: [],
    },
    {
      id: 1,
      name: 'Players',
      items: players,
    },
    {
      id: 2,
      name: 'Away Team',
      items: [],
    },
  ];
}
