import React, { useContext, useState } from "react";
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
  FormErrorMessage,
} from "@chakra-ui/react";
import { FiPlusCircle } from "react-icons/fi";
import { ProjectImagePicker } from "./ProjectImagePicker";
import useProjectQuery from "./hooks/useProjectQuery";
import { Select } from "chakra-react-select";
import { AuthContext } from "../../context/AuthContext";

export const AddProjectButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onModalOpen = async () => {
    setIcon(0);
    setName("");
    setDescription("");
    onOpen();
    setSelectedUsers([]);
  };

  const [icon, setIcon] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const { addMutation } = useProjectQuery();
  const { users } = useProjectQuery();

  const handleSaveClick = async () => {
    if (!name || !description) {
      setNameError(name === "");
      setDescriptionError(description === "");
    } else {
      addMutation.mutate(
        { name, description, icon, selectedUsers },
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
      <Flex h="14vh" alignItems="center">
        <Button
          onClick={onModalOpen}
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
                <FormLabel>Icon:</FormLabel>
                <ProjectImagePicker icon={icon} setIcon={setIcon} />
              </FormControl>
              <FormControl pb={6} isInvalid={nameError}>
                <FormLabel>Project Name:</FormLabel>
                <Input
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
                <FormLabel>Description:</FormLabel>
                <Textarea
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
                <FormLabel>Users assigned to the project: </FormLabel>
                <Select
                  isMulti
                  name="Users"
                  onChange={(e) => {
                    setSelectedUsers(e.map((s) => s.value));
                  }}
                  options={users
                    ?.filter((user) => user.id !== currentUser?.sub)
                    .map((user) => ({
                      label: user.userName,
                      value: user,
                    }))}
                  placeholder="Select users..."
                  closeMenuOnSelect={false}
                />
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
