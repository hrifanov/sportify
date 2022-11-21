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
import { EventEnum } from '../enums.js';

export const ModalGoal = () => {
  const [addEventRequest] = useMutation(ADD_EVENT_MUTATION);

  const { state, uiState, addEvent, finishAction } = useInteractiveMatchClient();
  const isOpen = uiState.action === INTERACTIVE_MATCH_ACTIONS.GOAL;
  const onClose = finishAction;

  const defaultValues = {
    attacker: '',
    assist: '',
    secondAssist: '',
  };

  const schema = yup.object().shape({
    attacker: yup.string().required().label('Attacker'),
  });

  const formMethods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  formMethods.watch('assist');
  const hasAssist = !!formMethods.getValues('assist');

  if (!isOpen) return;
  const team = state.teams[uiState.props.teamId];
  const onSubmit = (data) => {
    addEvent({
      type: EventEnum.GOAL,
      team: uiState.props.teamId,
      player: data.attacker,
      assist: data.assist,
      secondAssist: data.secondAssist,
    });
    formMethods.reset();
    finishAction();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as={Flex} align={'center'} gap={4}>
          <TeamAvatar team={team} size={'md'} />
          Add a goal
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5}>
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <Stack spacing="3">
                <PlayerSelect name="attacker" label="Attacker" teamId={uiState.props.teamId} />
                <PlayerSelect name="assist" label="First assist" teamId={uiState.props.teamId} />
                {hasAssist && (
                  <PlayerSelect
                    name="secondAssist"
                    label="Second assist"
                    teamId={uiState.props.teamId}
                  />
                )}
              </Stack>

              <Flex mt={8}>
                <Spacer />
                <Button
                  type="submit"
                  variant="primary"
                  onClick={formMethods.handleSubmit(onSubmit)}
                >
                  Add a goal
                </Button>
              </Flex>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
