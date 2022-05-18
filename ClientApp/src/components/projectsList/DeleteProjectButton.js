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
  FormControl,
  FormLabel,
  Input,
  Textarea,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import authService from "../api-authorization/AuthorizeService";

export const DeleteProjectButton = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteProject = async () => {
    const token = await authService.getAccessToken();
    console.log(token);
    const data = await fetch("project", {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
      headers: !token
        ? {}
        : {
            Authorization: `Bearer ${token}`,
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
          },
    });
    const json = JSON.stringify(data);
    return json;
  };

  const handleSaveClick = async () => {
    await deleteProject();
    onClose();
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
