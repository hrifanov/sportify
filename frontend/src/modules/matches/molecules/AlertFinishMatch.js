import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  useToast,
} from '@chakra-ui/react';
import {
  INTERACTIVE_MATCH_ACTIONS,
  useInteractiveMatchStore,
} from 'src/modules/matches/store/interactiveMatchStore';
import { useRef } from 'react';
import { MatchEvent } from 'src/modules/matches/atoms/MatchEvent';
import { useNavigate } from 'react-router-dom';
import { route } from 'src/Routes';

export const AlertFinishMatch = () => {
  const toast = useToast();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const { ui, finishMatch, finishAction } = useInteractiveMatchStore();
  const isOpen = ui.action === INTERACTIVE_MATCH_ACTIONS.FINISH_MATCH;

  async function onFinish() {
    const data = await finishMatch();
    if (data) {
      return navigate(route.matchDetail(data.id));
    }

    toast({
      title: 'There was an error finishing the match.',
      status: 'error',
      position: 'top-right',
    });
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
            Do you really want to finish this match?
          </AlertDialogHeader>

          <AlertDialogFooter>
            <Button variant={'outline'} ref={cancelRef} onClick={finishAction}>
              Continue match
            </Button>
            <Button colorScheme="green" onClick={onFinish} ml={3}>
              Finish match
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
