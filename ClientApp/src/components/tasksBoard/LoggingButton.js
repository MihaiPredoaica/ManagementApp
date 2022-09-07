import { TimeIcon } from "@chakra-ui/icons";
import { useQueryClient } from "react-query";
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
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import useProjectTaskQuery from "./hooks/useProjectTaskQuery";

export const LoggingButton = ({ task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  const { editMutation } = useProjectTaskQuery(task?.projectId);
  const [loggedHours, setLoggedHours] = useState(0);

  const handleSaveClick = async () => {
    editMutation.mutate(
      {
        ...task,
        logged: Number(task.logged) + Number(loggedHours),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("projectTaskList");
          setLoggedHours(0);
          onClose();
        },
      }
    );
  };

  return (
    <>
      <MenuItem onClick={onOpen} icon={<TimeIcon />}>
        Log hours
      </MenuItem>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log hours</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={1} px={3}>
            <FormControl pb={6}>
              <FormLabel>
                Log the amount of hours you worked on this task:
              </FormLabel>
              <NumberInput
                value={loggedHours}
                onChange={(e) => {
                  setLoggedHours(e);
                }}
                placeholder="Hours Worked"
                defaultValue={0}
                w={"100px"}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl pb={6}>
              <FormLabel>Original Estimation (in hours):</FormLabel>
              <NumberInput
                value={task.estimation}
                isDisabled={true}
                placeholder="Estimation"
                defaultValue={0}
                w={"100px"}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>

            <FormControl pb={6}>
              <FormLabel>Remaining hours:</FormLabel>
              <NumberInput
                value={task.estimation - task.logged}
                isDisabled={true}
                placeholder="Estimation"
                defaultValue={0}
                w={"100px"}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={async () => await handleSaveClick()}
              colorScheme="blue"
              mr={3}
            >
              Log
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
