import React from "react";
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
} from "@chakra-ui/react";
import { FiPlusCircle } from "react-icons/fi";

export const AddProjectButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
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

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a new project</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Project Name</FormLabel>
                <Input ref={initialRef} placeholder="Name" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
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
