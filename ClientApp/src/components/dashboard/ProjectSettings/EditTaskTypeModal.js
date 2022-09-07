import { EditIcon } from "@chakra-ui/icons";
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
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useTaskTypeQuery from "../hooks/useTaskTypeQuery";
import { TaskTypeIconPicker } from "./TaskTypeIconPicker";

export const EditTaskTypeModal = ({ taskType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onModalOpen = () => {
    setIcon(taskType.icon);
    setName(taskType.name);
    setDescription(taskType.description);
    onOpen();
  };

  const [icon, setIcon] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const { editMutation } = useTaskTypeQuery(taskType.projectId);

  const handleSaveClick = async () => {
    if (!name || !description) {
      setNameError(name === "");
      setDescriptionError(description === "");
    } else {
      editMutation.mutate(
        { ...taskType, name, description, icon },
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
      <MenuItem onClick={onModalOpen} icon={<EditIcon />}>
        Edit Task Type
      </MenuItem>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit task type</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl pb={6}>
              <FormLabel>Icon:</FormLabel>
              <TaskTypeIconPicker icon={icon} setIcon={setIcon} />
            </FormControl>
            <FormControl pb={6} isInvalid={nameError}>
              <FormLabel>Task Type Name:</FormLabel>
              <Input
                value={name}
                onChange={(e) => {
                  setNameError(false);
                  setName(e.target.value);
                }}
                placeholder="Name"
              />
              <FormErrorMessage>
                {nameError && "Task Type name required."}
              </FormErrorMessage>
            </FormControl>
            <FormControl pb={6} isInvalid={descriptionError}>
              <FormLabel>Description:</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => {
                  setDescriptionError(false);
                  setDescription(e.target.value);
                }}
                placeholder="Description"
              />
              <FormErrorMessage>
                {descriptionError && "Task Type description is required."}
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
    </>
  );
};
