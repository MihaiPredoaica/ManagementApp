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
} from "@chakra-ui/react";
import React, { useState } from "react";
import authService from "../api-authorization/AuthorizeService";
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

  const { editMutation } = useProjectQuery();

  const handleSaveClick = async () => {
    editMutation.mutate(
      { ...project, name, description, icon },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
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
            <FormControl pb={6}>
              <FormLabel>Project Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </FormControl>
            <FormControl pb={6}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
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
