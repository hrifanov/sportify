import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
} from '@chakra-ui/react';
import { CreateSeasonForm } from './CreateSeasonForm';

export const ModalCreateSeason = ({ isOpen, onOpen, onClose, createSeasonRQ }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={2}>
          <ModalHeader>Create new season</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateSeasonForm
              onSubmit={createSeasonRQ?.onSubmit}
              loading={createSeasonRQ?.loading}
              error={createSeasonRQ?.error}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
