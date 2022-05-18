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
import { ProjectImagePicker } from "./ProjectImagePicker";

export const EditProjectButton = ({ project }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onModalOpen = () => {
    setImage(project.icon);
    setName(project.name);
    setDescription(project.description);
    onOpen();
  };

  const [image, setImage] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const putProject = async (user) => {
    const token = await authService.getAccessToken();
    console.log(token);
    const data = await fetch("project", {
      method: "PUT",
      body: JSON.stringify({
        id: project.id,
        name,
        description,
        icon: image,
        ownerId: user.sub,
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
    const [user] = await Promise.all([authService.getUser()]);

    putProject(user);
    console.log(name, description, image, user.sub);
    onClose();
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
              <ProjectImagePicker image={image} setImage={setImage} />
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
