import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export const ModalDeleteSeasonConfirm = ({ modalNewSeason, handleDeleteSeason, seasonId }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={modalNewSeason?.isOpen} onClose={modalNewSeason?.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>This cannot be undone.</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                modalNewSeason?.onClose();
                handleDeleteSeason(seasonId);
              }}
            >
              Delete
            </Button>
            <Button variant="ghost" onClick={modalNewSeason?.onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
