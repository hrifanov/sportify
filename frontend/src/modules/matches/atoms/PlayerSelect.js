import { Select } from '@chakra-ui/react';
import { FormField } from 'src/shared/hook-form';
import { useInteractiveMatchStore } from 'src/modules/matches/store/interactiveMatchStore';

export const PlayerSelect = ({ name, label, teamId }) => {
  const { computed } = useInteractiveMatchStore();
  const team = computed.teams[teamId];
  const playersOptions = team.teamPlayers.map((player) => ({
    value: player.user.id,
    label: player.user.name,
  }));

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
