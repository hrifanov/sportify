import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Text,
  Button,
} from '@chakra-ui/react';
import {
  INTERACTIVE_MATCH_ACTIONS,
  useInteractiveMatchStore,
} from 'src/modules/matches/store/interactiveMatchStore';
import { useRef } from 'react';
import { MatchEvent } from 'src/modules/matches/atoms/MatchEvent';
import { useNavigate } from 'react-router-dom';
import { route } from 'src/Routes';

export const AlertCancelMatch = () => {
  const cancelRef = useRef();
  const navigate = useNavigate();
  const { ui, clearStore, finishAction, match, computed } = useInteractiveMatchStore();
  const isOpen = ui.action === INTERACTIVE_MATCH_ACTIONS.CANCEL_MATCH;

  async function onCancel() {
    if (computed.isEdit) {
      await navigate(route.matchDetail(match.id));
    } else {
      await navigate('/');
    }

    clearStore();
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={finishAction}
      isCentered={true}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {computed.isEdit && <Text>Do you really want to cancel changes to this match?</Text>}
            {!computed.isEdit && <Text>Do you really want to cancel this match?</Text>}
          </AlertDialogHeader>

          <AlertDialogBody>
            This action is irreversible. All of the unsaved data will be lost.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant={'outline'} ref={cancelRef} onClick={finishAction}>
              Continue match
            </Button>
            <Button colorScheme="red" onClick={onCancel} ml={3}>
              {computed.isEdit && <Text>Cancel changes</Text>}
              {!computed.isEdit && <Text>Cancel match</Text>}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
