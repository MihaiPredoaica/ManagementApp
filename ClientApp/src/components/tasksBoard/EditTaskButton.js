import React, { useState } from "react";
import {
  MenuItem,
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
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Select } from "chakra-react-select";
import useTaskTypeQuery from "../dashboard/hooks/useTaskTypeQuery";
import { useParams } from "react-router-dom";
import useProjectTaskQuery from "./hooks/useProjectTaskQuery";
import { useQueryClient } from "react-query";

export const EditTaskButton = ({ taskStageList, task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id } = useParams();
  const { editMutation, projectTasks } = useProjectTaskQuery(id);

  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [parentTask, setParentTask] = useState(
    projectTasks.find((t) => t.id === task.parentTaskId)
  );
  const [taskType, setTaskType] = useState(task.type);
  const [estimation, setEstimation] = useState(task.estimation);
  const [taskStage, setTaskStage] = useState(task.stage);

  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [taskTypeError, setTaskTypeError] = useState(false);
  const [parentTaskError, setParentTaskError] = useState(false);
  const [taskStageError, setTaskStageError] = useState(false);

  const queryClient = useQueryClient();

  const onModalOpen = () => {
    setName(task.name);
    setDescription(task.description);
    setParentTask(projectTasks.find((t) => t.id === task.parentTaskId));
    setTaskType(task.type);
    setEstimation(task.estimation);
    setTaskStage(taskStageList.find((s) => s.id === task.stage));
    onOpen();
  };

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
      editMutation.mutate(
        {
          id: task.id,
          name,
          description,
          icon: taskType?.icon,
          typeId: taskType?.id,
          projectId: id,
          parentTaskId: parentTask?.id,
          layer: parentTask?.layer + 1,
          estimation: estimation,
          stage: taskStage?.id,
          logged: task.logged,
        },
        {
          onSuccess: () => {
            onClose();
            queryClient.invalidateQueries("projectTaskList");
          },
        }
      );
    }
  };

  return (
    <>
      <MenuItem onClick={onModalOpen} icon={<EditIcon />}>
        Task Details
      </MenuItem>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Task Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl pb={6} isInvalid={nameError}>
              <FormLabel>Task Name:</FormLabel>
              <Input
                value={name}
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
                value={description}
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
                value={{ label: taskStage.name, value: taskStage.id }}
                isMulti={false}
                name="Task Stage"
                onChange={(e) => {
                  setTaskStageError(false);
                  setTaskStage(e.value);
                }}
                options={taskStageList.map((stage) => ({
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
                value={{ label: taskType.name, value: taskType.id }}
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
                value={{ label: parentTask?.name, value: parentTask?.id }}
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
    </>
  );
};
