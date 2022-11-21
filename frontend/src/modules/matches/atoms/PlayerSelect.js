import { forwardRef } from 'src/shared/design-system/system';
import { Select } from '@chakra-ui/react';
import { FormField } from 'src/shared/hook-form';
import { useInteractiveMatchClient } from 'src/modules/matches/apollo/interactiveMatchClient';

export const PlayerSelect = ({ name, label, teamId }) => {
  const { state } = useInteractiveMatchClient();
  const team = state.teams[teamId];
  const playersOptions = team.teamPlayers.map((player) => ({
    value: player.id,
    label: player.user.name,
  }));

  return (
    <FormField
      id={name}
      name={name}
      label={label}
      input={forwardRef((props, ref) => (
        <Select {...props} ref={ref}>
          <option value={''}>Select a player</option>
          {playersOptions.map((option) => (
            <option key={`${name}-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ))}
    />
  );
};
