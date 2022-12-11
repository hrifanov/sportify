import { Select } from '@chakra-ui/react';
import { FormField } from 'src/shared/hook-form';
import { useInteractiveMatchStore } from 'src/modules/matches/store/interactiveMatchStore';
import { reject } from 'lodash';
import { RoleEnum } from 'src/modules/matches/enums';

export const PlayerSelect = ({ name, label, teamId, ignored }) => {
  const { computed } = useInteractiveMatchStore();
  const team = computed.teams[teamId];
  const playersOptions = reject(team.teamPlayers, (player) => {
    if (player.role === RoleEnum.GOALKEEPER) return true;
    if (ignored && ignored.includes(player.user.id)) return true;
  }).map((player) => ({
    value: player.user.id,
    label: player.user.name,
  }));

  if (!playersOptions.length) return null;

  return (
    <FormField id={name} name={name} label={label} input={Select}>
      <option value={''}>Select a player</option>
      {playersOptions.map((option) => (
        <option key={`${name}-${option.value}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </FormField>
  );
};
