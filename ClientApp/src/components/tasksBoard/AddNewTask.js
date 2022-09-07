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
  FormErrorMessage,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { FiPlusCircle } from "react-icons/fi";
import { Select } from "chakra-react-select";
import useTaskTypeQuery from "../dashboard/hooks/useTaskTypeQuery";
import { useParams } from "react-router-dom";
import useProjectTaskQuery from "./hooks/useProjectTaskQuery";

export const AddNewTask = ({ taskStageList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onModalOpen = async () => {
    setName("");
    setDescription("");
    onOpen();
    setParentTask({});
    setTaskType({});
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentTask, setParentTask] = useState({});
  const [taskType, setTaskType] = useState({});
  const [estimation, setEstimation] = useState(0);
  const [taskStage, setTaskStage] = useState({});

  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [taskTypeError, setTaskTypeError] = useState(false);
  const [parentTaskError, setParentTaskError] = useState(false);
  const [taskStageError, setTaskStageError] = useState(false);

  const { id } = useParams();

  const { addMutation, projectTasks } = useProjectTaskQuery(id);
  const { taskTypes } = useTaskTypeQuery(id);

  const handleSaveClick = async () => {
    if (
      !name ||
      !description ||
      !(taskType.id >= 0) ||
      !(parentTask.id >= 0) ||
      !(taskStage.id >= 0)
    ) {
      setNameError(name === "");
      setDescriptionError(description === "");
      setTaskTypeError(!(taskType.id >= 0) ? true : false);
      setParentTaskError(!(parentTask.id >= 0) ? true : false);
      setTaskStageError(!(taskStage.id >= 0) ? true : false);
    } else {
      addMutation.mutate(
        {
          name,
          description,
          icon: taskType?.icon,
          typeId: taskType?.id,
          projectId: id,
          parentTaskId: parentTask?.id,
          layer: parentTask?.layer + 1,
          estimation: estimation,
          stage: taskStage?.id,
          logged: 0,
        },
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
          <Text>Add Task</Text>
        </Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a new task</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl pb={6} isInvalid={nameError}>
                <FormLabel>Task Name:</FormLabel>
                <Input
                  onChange={(e) => {
                    setNameError(false);
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                />
                <FormErrorMessage>
                  {nameError && "Task name required."}
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
                  {descriptionError && "Task description is required."}
                </FormErrorMessage>
              </FormControl>
              <FormControl pb={6}>
                <FormLabel>Estimation:</FormLabel>
                <NumberInput
                  value={estimation}
                  onChange={(e) => {
                    setEstimation(e);
                  }}
                  placeholder="Estimation"
                  defaultValue={0}
                  w={"100px"}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <FormControl pb={6} isInvalid={taskStageError}>
                <FormLabel>Task Stage: </FormLabel>
                <Select
                  isMulti={false}
                  name="Task Stage"
                  onChange={(e) => {
                    setTaskStageError(false);
                    setTaskStage(e.value);
                  }}
                  options={taskStageList?.map((stage) => ({
                    label: stage.name,
                    value: stage,
                  }))}
                  placeholder="Select task stage..."
                  closeMenuOnSelect={true}
                />
                <FormErrorMessage>
                  {taskTypeError && "Task stage is required."}
                </FormErrorMessage>
              </FormControl>
              <FormControl pb={6} isInvalid={taskTypeError}>
                <FormLabel>Task Type: </FormLabel>
                <Select
                  isMulti={false}
                  name="Task Type"
                  onChange={(e) => {
                    setTaskTypeError(false);
                    setTaskType(e.value);
                  }}
                  options={taskTypes
                    ?.filter((taskType) => taskType.icon !== 16)
                    .map((taskType) => ({
                      label: taskType.name,
                      value: taskType,
                    }))}
                  placeholder="Select task type..."
                  closeMenuOnSelect={true}
                />
                <FormErrorMessage>
                  {taskTypeError && "Task type is required."}
                </FormErrorMessage>
              </FormControl>
              <FormControl pb={6} isInvalid={parentTaskError}>
                <FormLabel>Parent Task: </FormLabel>
                <Select
                  isMulti={false}
                  name="Parent Task"
                  onChange={(e) => {
                    setParentTaskError(false);
                    setParentTask(e.value);
                  }}
                  options={projectTasks?.map((projectTask) => ({
                    label: projectTask.name,
                    value: projectTask,
                  }))}
                  placeholder="Select parent task..."
                  closeMenuOnSelect={true}
                />
                <FormErrorMessage>
                  {parentTaskError && "Parent task is required."}
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
