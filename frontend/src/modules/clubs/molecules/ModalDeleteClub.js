import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
} from '@chakra-ui/react';

export const ModalDeleteClub = ({ isOpen, onOpen, onClose, handleDeleteClub }) => {
  return (
    <>
      <Flex justify="center" mt={3} w="100%">
        <Button w="100%" variant={'ghost'} onClick={onOpen}>
          Delete club
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>This cannot be undone.</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleDeleteClub(true)}>
              Delete
            </Button>
            <Button variant="ghost" onClick={() => handleDeleteClub(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
