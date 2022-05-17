import React, { useState } from "react";
import {
  Text,
  Flex,
  Button,
  useColorModeValue,
  Icon,
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
} from "@chakra-ui/react";
import { FiPlusCircle } from "react-icons/fi";
import { ProjectImagePicker } from "./ProjectImagePicker";
import authService from "../api-authorization/AuthorizeService";

export const AddProjectButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const postProject = async (user) => {
    const token = await authService.getAccessToken();
    console.log(token);
    const data = await fetch("project", {
      method: "POST",
      body: JSON.stringify({
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
    const json = await data.json();
    return json;
  };

  const handleSaveClick = async () => {
    const [user] = await Promise.all([authService.getUser()]);

    postProject(user);
    console.log(name, description, image, user.sub);
    onClose();
  };

  return (
    <>
      <Flex h="14vh" alignItems="center">
        <Button
          onClick={onOpen}
          bg={useColorModeValue("gray.200", "gray.500")}
          color={useColorModeValue("black.700", "white.700")}
          w="200px"
          h="60px"
          rounded={"100"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
        >
          <Icon
            mr="4"
            fontSize="35"
            _groupHover={{
              color: "black",
            }}
            as={FiPlusCircle}
          />
          <Text>Add Project</Text>
        </Button>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a new project</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl pb={6}>
                <FormLabel>Project Name</FormLabel>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </FormControl>
              <FormControl pb={6}>
                <FormLabel>Description</FormLabel>
                <Textarea
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
      </Flex>
    </>
  );
};
