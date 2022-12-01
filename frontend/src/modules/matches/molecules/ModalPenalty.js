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
import { EventEnum, PenaltyEnum } from '../enums.js';
import { map } from 'lodash';
import {
  INTERACTIVE_MATCH_ACTIONS,
  useInteractiveMatchStore,
} from 'src/modules/matches/store/interactiveMatchStore';
import { useEffect } from 'react';
import { TimeInput } from 'src/modules/matches/atoms/TimeInput';

export const ModalPenalty = () => {
  const { computed, ui, addEvent, editEvent, finishAction, timer } = useInteractiveMatchStore();
  const isOpen = ui.action === INTERACTIVE_MATCH_ACTIONS.PENALTY;
  const isEdit = !!ui.props?.event;
  const actionLabel = `${isEdit ? 'Edit' : 'Add'} a penalty`;

  const defaultValues = {
    playerId: '',
    length: '',
    type: '',
    time: '00:00:00',
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
    playerId: yup.string().required().label('Player'),
    type: yup.string().required().label('Type'),
    length: yup.string().required().label('Length'),
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

  if (!isOpen) return;
  const team = computed.teams[ui.props.teamId];
  const onSubmit = (data) => {
    if (isEdit) {
      editEvent(ui.props.event.id, { data });
    } else {
      addEvent({
        type: EventEnum.PENALTY,
        data: {
          teamId: ui.props.teamId,
          ...data,
        },
      });
    }
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
                <PlayerSelect name="playerId" label="Player" teamId={ui.props.teamId} />
                <FormField id="type" name="type" label="Penalty type" input={Select}>
                  <option value={''}>Select a penalty</option>
                  {penaltyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </FormField>
                <FormField id="length" name="length" label="Penalty length" input={Select}>
                  <option value={''}>Select a penalty length</option>
                  {penaltyLengthOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </FormField>
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
