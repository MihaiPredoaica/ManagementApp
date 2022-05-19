import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useProjectQuery from "./hooks/useProjectQuery";

export const DeleteProjectButton = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteMutation } = useProjectQuery();

  const handleSaveClick = async () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <>
      <MenuItem onClick={onOpen} icon={<DeleteIcon />}>
        Delete Project
      </MenuItem>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={1} px={3}>
            <Text align="center">
              Are you sure you want to detele the project?
            </Text>
            <Text align="center">This action cannot be revesed.</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={async () => await handleSaveClick()}
              colorScheme="red"
              mr={3}
            >
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
