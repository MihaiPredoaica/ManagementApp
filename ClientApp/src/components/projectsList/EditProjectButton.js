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
import useProjectQuery from "./hooks/useProjectQuery";
import { ProjectImagePicker } from "./ProjectImagePicker";

export const EditProjectButton = ({ project }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onModalOpen = () => {
    setIcon(project.icon);
    setName(project.name);
    setDescription(project.description);
    onOpen();
  };

  const [icon, setIcon] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const { editMutation } = useProjectQuery();

  const handleSaveClick = async () => {
    if (!name || !description) {
      setNameError(name === "");
      setDescriptionError(description === "");
    } else {
      editMutation.mutate(
        { ...project, name, description, icon },
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
        Edit Project
      </MenuItem>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl pb={6} isInvalid={nameError}>
              <FormLabel>Project Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => {
                  setNameError(false);
                  setName(e.target.value);
                }}
                placeholder="Name"
              />
              <FormErrorMessage>
                {nameError && "Project name required."}
              </FormErrorMessage>
            </FormControl>
            <FormControl pb={6} isInvalid={descriptionError}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => {
                  setDescriptionError(false);
                  setDescription(e.target.value);
                }}
                placeholder="Description"
              />
              <FormErrorMessage>
                {descriptionError && "Project description is required."}
              </FormErrorMessage>
            </FormControl>
            <FormControl pb={6}>
              <ProjectImagePicker icon={icon} setIcon={setIcon} />
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
