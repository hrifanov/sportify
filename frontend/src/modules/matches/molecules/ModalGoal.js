import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
} from '@chakra-ui/react';
import { TeamAvatar } from 'src/modules/matches/atoms/TeamAvatar';
import { FormField, yup, yupResolver } from 'src/shared/hook-form';
import { Stack } from 'src/shared/design-system';
import { PlayerSelect } from 'src/modules/matches/atoms/PlayerSelect';
import { useForm, FormProvider } from 'react-hook-form';
import {
  INTERACTIVE_MATCH_ACTIONS,
  useInteractiveMatchStore,
} from 'src/modules/matches/store/interactiveMatchStore';
import { useEffect } from 'react';
import { TimeInput } from 'src/modules/matches/atoms/TimeInput';
import { timeToString } from 'src/utils/match';
import { map } from 'lodash';

export const ModalGoal = () => {
  const { addGoal, editEvent, computed, ui, finishAction, timer, enums } =
    useInteractiveMatchStore();
  const isOpen = ui.action === INTERACTIVE_MATCH_ACTIONS.GOAL;
  const isEdit = !!ui.props?.event;
  const actionLabel = `${isEdit ? 'Edit' : 'Add'} a goal`;

  const defaultValues = {
    playerId: '',
    assistId: '',
    secondAssistId: '',
    time: timeToString(0),
  };

  const schema = yup.object().shape({
    playerId: yup.string().required().label('Attacker'),
  });

  const goalTypeOptions = map(enums?.goalTypes ?? [], ({ value, key }) => ({
    value: key,
    label: value,
  }));

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

  formMethods.watch('playerId');
  formMethods.watch('assistId');
  const selectedPlayerId = formMethods.getValues('playerId');
  const selectedAssistId = formMethods.getValues('assistId');
  const hasAssist = !!selectedAssistId;

  if (!isOpen) return;
  const team = computed.teams[ui.props.teamId];
  const onSubmit = (data) => {
    const input = {
      time: data.time,
      data: {
        teamId: ui.props.teamId,
        playerId: data.playerId,
        assistId: data.assistId,
        secondAssistId: data.secondAssistId,
      },
    };

    if (isEdit) {
      editEvent(ui.props.event.id, input);
    } else {
      addGoal(input);
    }

    formMethods.reset();
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
                <PlayerSelect name="playerId" label="Attacker" teamId={ui.props.teamId} />
                <PlayerSelect
                  name="assistId"
                  label="First assist"
                  teamId={ui.props.teamId}
                  ignored={[selectedPlayerId]}
                />
                {hasAssist && (
                  <PlayerSelect
                    name="secondAssistId"
                    label="Second assist"
                    teamId={ui.props.teamId}
                    ignored={[selectedPlayerId, selectedAssistId]}
                  />
                )}
                <FormField id="type" name="type" label="Goal type" input={Select}>
                  <option value={''}>Normal goal</option>
                  {goalTypeOptions.map((option) => (
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
