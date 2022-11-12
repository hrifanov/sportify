import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
} from '@chakra-ui/react';
import {
  addEvent,
  INTERACTIVE_MATCH_ACTIONS,
  useInteractiveMatchClient,
} from 'src/modules/matches/apollo/interactiveMatchClient';
import { TeamAvatar } from 'src/modules/matches/atoms/TeamAvatar';
import { Form, FormField, yup, yupResolver } from 'src/shared/hook-form';
import { ErrorBanner, Stack } from 'src/shared/design-system';
import { forwardRef } from 'src/shared/design-system/system';
import { PlayerSelect } from 'src/modules/matches/atoms/PlayerSelect';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_EVENT_MUTATION } from '../apollo/mutations.js';
import { EventEnum, PenaltyEnum } from '../enums.js';
import { map } from 'lodash';

export const ModalPenalty = () => {
  const { state, uiState, addEvent, finishAction } = useInteractiveMatchClient();
  const isOpen = uiState.action === INTERACTIVE_MATCH_ACTIONS.PENALTY;
  const onClose = finishAction;

  const defaultValues = {
    player: '',
    penalty: '',
    length: '',
  };

  const penaltyOptions = map(PenaltyEnum, (value, key) => ({
    value: key,
    label: value,
  }));

  const penaltyLengthOptions = [
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 120, label: '2 minutes' },
    { value: 180, label: '3 minutes' },
    { value: 300, label: '5 minutes' },
    { value: 600, label: '10 minutes' },
  ];

  const schema = yup.object().shape({
    player: yup.string().required().label('Player'),
    kind: yup.string().required().label('Type'),
    length: yup.string().required().label('Length'),
  });

  const formMethods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  if (!isOpen) return;
  const team = state.teams[uiState.props.teamId];
  const onSubmit = (data) => {
    addEvent({
      type: EventEnum.PENALTY,
      team: uiState.props.teamId,
      player: data.player,
      kind: data.kind,
      length: data.length,
    });
    finishAction();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as={Flex} align={'center'} gap={4}>
          <TeamAvatar team={team} size={'md'} />
          Add a penalty
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5}>
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <Stack spacing="3">
                <PlayerSelect name="player" label="Player" teamId={uiState.props.teamId} />
                <FormField
                  id="kind"
                  name="kind"
                  label="Penalty type"
                  input={forwardRef((props, ref) => (
                    <Select {...props} ref={ref}>
                      <option value={''}>Select a penalty</option>
                      {penaltyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  ))}
                />
                <FormField
                  id="length"
                  name="length"
                  label="Penalty length"
                  input={forwardRef((props, ref) => (
                    <Select {...props} ref={ref}>
                      <option value={''}>Select a penalty length</option>
                      {penaltyLengthOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  ))}
                />
              </Stack>

              <Flex mt={8}>
                <Spacer />
                <Button
                  type="submit"
                  variant="primary"
                  onClick={formMethods.handleSubmit(onSubmit)}
                >
                  Add a penalty
                </Button>
              </Flex>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
