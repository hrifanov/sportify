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
import { PlayerSelect } from 'src/modules/matches/atoms/PlayerSelect';
import { useForm, FormProvider } from 'react-hook-form';
import { EventEnum } from '../enums.js';
import { map } from 'lodash';
import {
  INTERACTIVE_MATCH_ACTIONS,
  useInteractiveMatchStore,
} from 'src/modules/matches/store/interactiveMatchStore';
import { useEffect } from 'react';
import { TimeInput } from 'src/modules/matches/atoms/TimeInput';
import { timeToString } from 'src/utils/match';

export const ModalPenalty = () => {
  const { computed, ui, addEvent, editEvent, finishAction, timer, enums } =
    useInteractiveMatchStore();
  const isOpen = ui.action === INTERACTIVE_MATCH_ACTIONS.PENALTY;
  const isEdit = !!ui.props?.event;
  const actionLabel = `${isEdit ? 'Edit' : 'Add'} a penalty`;

  const defaultValues = {
    playerId: '',
    length: '',
    type: '',
    time: timeToString(0),
  };

  const penaltyOptions = map(enums?.penaltyTypes ?? [], ({ value, key }) => ({
    value: key,
    label: value,
  }));
  const penaltyLengthOptions = map(enums?.penaltyLengths ?? [], ({ key }) => ({
    value: key,
    label: key,
  }));

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
    formMethods.setValue('time', timeToString(ui.props.event?.time ?? timer));

    if (!ui.props?.event) return;

    for (const key in ui.props.event.data) {
      formMethods.setValue(key, ui.props.event.data[key]);
    }
  }, [formMethods, ui.props.event, isOpen, timer]);

  if (!isOpen) return;
  const team = computed.teams[ui.props.teamId];
  const onSubmit = (data) => {
    const input = {
      type: EventEnum.PENALTY,
      time: data.time,
      data: {
        teamId: ui.props.teamId,
        playerId: data.playerId,
        length: data.length,
        type: data.type,
      },
    };

    if (isEdit) {
      editEvent(ui.props.event.id, input);
    } else {
      addEvent(input);
    }
    finishAction();
  };

  return (
    <Modal isOpen={isOpen} onClose={finishAction} isCentered={true}>
      <ModalOverlay />
      <ModalContent mx={2}>
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
