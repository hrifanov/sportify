import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useConfirmAlertStore } from 'src/shared/core/confirmAlertStore';

export const ConfirmAlert = () => {
  const { alert, confirm, reject } = useConfirmAlertStore();
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={!!alert}
      leastDestructiveRef={cancelRef}
      onClose={reject}
      isCentered={true}
    >
      <AlertDialogOverlay>
        <AlertDialogContent mx={2}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {alert?.title}
          </AlertDialogHeader>

          <AlertDialogFooter>
            <Button variant={'outline'} ref={cancelRef} onClick={reject}>
              No
            </Button>
            <Button
              colorScheme={alert?.variant === 'danger' ? 'red' : 'green'}
              onClick={confirm}
              ml={3}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
