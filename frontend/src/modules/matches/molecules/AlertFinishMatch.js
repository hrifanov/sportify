import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';
import {
  INTERACTIVE_MATCH_ACTIONS,
  useInteractiveMatchStore,
} from 'src/modules/matches/store/interactiveMatchStore';
import React, { useRef } from 'react';
import { MatchEvent } from 'src/modules/matches/atoms/MatchEvent';
import { useNavigate } from 'react-router-dom';
import { route } from 'src/Routes';

export const AlertFinishMatch = () => {
  const toast = useToast();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const { ui, finishMatch, finishAction, computed, clearStore } = useInteractiveMatchStore();
  const isOpen = ui.action === INTERACTIVE_MATCH_ACTIONS.FINISH_MATCH;

  async function onFinish() {
    // await navigate('/');
    const data = await finishMatch();
    console.log({ data });
    if (data) {
      await navigate(route.matchDetail(data.id));
      clearStore();
      return;
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
            {computed.canBeFinished && <Text>Do you really want to finish this match?</Text>}
            {!computed.canBeFinished && <Text>This match cannot be finished yet.</Text>}
          </AlertDialogHeader>

          <AlertDialogFooter>
            <Button variant={'outline'} ref={cancelRef} onClick={finishAction}>
              Continue match
            </Button>
            <Button
              colorScheme="green"
              onClick={onFinish}
              ml={3}
              disabled={!computed.canBeFinished}
            >
              Finish match
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
