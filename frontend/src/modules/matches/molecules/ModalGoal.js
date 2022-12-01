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
import { TeamAvatar } from 'src/modules/matches/atoms/TeamAvatar';
import { Form, FormField, yup, yupResolver } from 'src/shared/hook-form';
import { ErrorBanner, Stack } from 'src/shared/design-system';
import { forwardRef } from 'src/shared/design-system/system';
import { PlayerSelect } from 'src/modules/matches/atoms/PlayerSelect';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_EVENT_MUTATION } from '../apollo/mutations.js';
import { EventEnum } from '../enums.js';
import {
  INTERACTIVE_MATCH_ACTIONS,
  useInteractiveMatchStore,
} from 'src/modules/matches/store/interactiveMatchStore';
import { useEffect } from 'react';
import { TimeInput } from 'src/modules/matches/atoms/TimeInput';

export const ModalGoal = () => {
  const [addEventRequest] = useMutation(ADD_EVENT_MUTATION);

  const { addEvent, editEvent, computed, ui, finishAction } = useInteractiveMatchStore();
  const isOpen = ui.action === INTERACTIVE_MATCH_ACTIONS.GOAL;
  const isEdit = !!ui.props?.event;
  const actionLabel = `${isEdit ? 'Edit' : 'Add'} a goal`;

  const defaultValues = {
    playerId: '',
    assistId: '',
    secondAssistId: '',
    time: '00:00:00',
  };

  const schema = yup.object().shape({
    playerId: yup.string().required().label('Attacker'),
  });

  const formMethods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    formMethods.reset();
    if (!ui.props?.event) return;

    for (const key in ui.props.event.data) {
      formMethods.setValue(key, ui.props.event.data[key]);
    }
  }, [formMethods, ui.props?.event, isOpen]);

  formMethods.watch('assistId');
  const hasAssist = !!formMethods.getValues('assistId');

  if (!isOpen) return;
  const team = computed.teams[ui.props.teamId];
  const onSubmit = (data) => {
    if (isEdit) {
      editEvent(ui.props.event.id, { data });
    } else {
      addEvent({
        type: EventEnum.GOAL,
        data: {
          teamId: ui.props.teamId,
          ...data,
        },
      });
    }

    formMethods.reset();
    finishAction();
  };

  return (
    <Modal isOpen={isOpen} onClose={finishAction} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as={Flex} align={'center'} gap={4}>
          <TeamAvatar team={team} size={'md'} />
          {actionLabel}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5}>
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <Stack spacing="3">
                <PlayerSelect name="playerId" label="Attacker" teamId={ui.props.teamId} />
                <PlayerSelect name="assistId" label="First assist" teamId={ui.props.teamId} />
                {hasAssist && (
                  <PlayerSelect
                    name="secondAssistId"
                    label="Second assist"
                    teamId={ui.props.teamId}
                  />
                )}
                <TimeInput name={'time'} />
              </Stack>

              <Flex mt={8}>
                <Spacer />
                <Button
                  type="submit"
                  variant="primary"
                  onClick={formMethods.handleSubmit(onSubmit)}
                >
                  {actionLabel}
                </Button>
              </Flex>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
