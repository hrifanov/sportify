import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
} from '@chakra-ui/react';
import {
  INTERACTIVE_MATCH_ACTIONS,
  useInteractiveMatchStore,
} from 'src/modules/matches/store/interactiveMatchStore';
import { useRef } from 'react';
import { MatchEvent } from 'src/modules/matches/atoms/MatchEvent';

export const AlertDeleteEvent = () => {
  const { ui, finishAction, deleteEvent } = useInteractiveMatchStore();
  const isOpen = ui.action === INTERACTIVE_MATCH_ACTIONS.DELETE_EVENT;
  const cancelRef = useRef();

  if (!ui.props?.event) return;

  function onDelete() {
    deleteEvent(ui.props.event.id);
    finishAction();
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={finishAction}
      isCentered={true}
    >
      <AlertDialogOverlay>
        <AlertDialogContent mx={2}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Do you really want to delete this event?
          </AlertDialogHeader>

          <AlertDialogBody>
            <MatchEvent event={ui.props.event} readonly={true} />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant={'outline'} ref={cancelRef} onClick={finishAction}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
