import React, { useState } from "react";
import {
  Flex,
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
  FormErrorMessage,
  IconButton,
} from "@chakra-ui/react";
import { TaskTypeIconPicker } from "./TaskTypeIconPicker";
import useTaskTypeQuery from "../hooks/useTaskTypeQuery";
import { AddIcon } from "@chakra-ui/icons";

export const AddTaskTypeModal = ({ project }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onModalOpen = async () => {
    setIcon(0);
    setName("");
    setDescription("");
    onOpen();
  };

  const [icon, setIcon] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const { addMutation } = useTaskTypeQuery(project?.id);

  const handleSaveClick = async () => {
    if (!name || !description) {
      setNameError(name === "");
      setDescriptionError(description === "");
    } else {
      addMutation.mutate(
        { name, description, icon },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  return (
    <>
      <Flex alignItems="center">
        <Button
          onClick={onModalOpen}
          as={IconButton}
          aria-label="Options"
          icon={<AddIcon />}
          colorScheme="blue"
          w={"25px"}
          h={"35px"}
        />

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a new task type</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl pb={6}>
                <FormLabel>Icon:</FormLabel>
                <TaskTypeIconPicker icon={icon} setIcon={setIcon} />
              </FormControl>
              <FormControl pb={6} isInvalid={nameError}>
                <FormLabel>Task Type Name:</FormLabel>
                <Input
                  onChange={(e) => {
                    setNameError(false);
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                />
                <FormErrorMessage>
                  {nameError && "Task type name required."}
                </FormErrorMessage>
              </FormControl>
              <FormControl pb={6} isInvalid={descriptionError}>
                <FormLabel>Description:</FormLabel>
                <Textarea
                  onChange={(e) => {
                    setDescriptionError(false);
                    setDescription(e.target.value);
                  }}
                  placeholder="Description"
                />
                <FormErrorMessage>
                  {descriptionError && "Task type description is required."}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={async () => await handleSaveClick()}
                colorScheme="blue"
                mr={3}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};
