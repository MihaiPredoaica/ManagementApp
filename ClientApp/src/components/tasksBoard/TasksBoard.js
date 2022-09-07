import {
  Flex,
  Stack,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProjectContext } from "../../context/ProjectContext";
import useDashboardQuery from "../dashboard/hooks/useDashboardQuery";
import useTaskTypeQuery from "../dashboard/hooks/useTaskTypeQuery";
import { LoadingSpinner } from "../generalComponents/LoadingSpinner";
import { AddNewTask } from "./AddNewTask";
import { BoardColumn } from "./BoardColumn";
import useProjectTaskQuery from "./hooks/useProjectTaskQuery";
import { useQueryClient } from "react-query";

export function TasksBoard() {
  const { setNavBarVisible } = useContext(AuthContext);
  const { setSelectedProject } = useContext(ProjectContext);
  const { id } = useParams();

  const { project } = useDashboardQuery(id);
  const { projectTasks, projectTasksLoading, editMutation } =
    useProjectTaskQuery(id);
  const { taskTypes } = useTaskTypeQuery(id);
  const stackColor = useColorModeValue("#cacafe", "#0b1437");
  const queryClient = useQueryClient();

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      console.log(destColumn, removed);
      editMutation.mutate(
        {
          ...removed,
          stage: destColumn.id,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("projectTaskList");
          },
        }
      );
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const taskStageList = [
    {
      id: 0,
      name: "Backlog",
      items: [],
    },
    {
      id: 1,
      name: "In Progress",
      items: [],
    },
    {
      id: 2,
      name: "To Verify",
      items: [],
    },
    {
      id: 3,
      name: "Done",
      items: [],
    },
  ];

  useEffect(() => {
    setColumns([
      {
        id: 0,
        name: "Backlog",
        items:
          projectTasks?.filter(
            (task) => task.icon !== 16 && task.stage === 0
          ) ?? [],
      },
      {
        id: 1,
        name: "In Progress",
        items:
          projectTasks?.filter(
            (task) => task.icon !== 16 && task.stage === 1
          ) ?? [],
      },
      {
        id: 2,
        name: "To Verify",
        items:
          projectTasks?.filter(
            (task) => task.icon !== 16 && task.stage === 2
          ) ?? [],
      },
      {
        id: 3,
        name: "Done",
        items:
          projectTasks?.filter(
            (task) => task.icon !== 16 && task.stage === 3
          ) ?? [],
      },
    ]);
  }, [projectTasks]);

  const [columns, setColumns] = useState(taskStageList);

  useEffect(() => {
    setNavBarVisible(true);
    setSelectedProject(project);
  }, [setNavBarVisible, setSelectedProject, project]);

  if (projectTasksLoading) return <LoadingSpinner />;

  return (
    <Stack>
      <AddNewTask taskStageList={taskStageList} />
      {taskTypes?.filter((t) => t.icon !== 16)?.length === 0 && (
        <Stack borderRadius="xl" bg={stackColor} flex={1} mt={15}>
          <Heading margin={"10px"} marginLeft={"30px"}>
            No Task Types!
          </Heading>
          <Text size="sm" padding={"10px"} paddingLeft={"30px"}>
            Before you can add a new task, have the project administrator add at
            least one task type.
          </Text>
        </Stack>
      )}
      {taskTypes?.filter((t) => t.icon !== 16)?.length > 0 && (
        <Flex flex={1} mt={15} wrap="nowrap">
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column]) => {
              return (
                <BoardColumn
                  taskStageList={taskStageList}
                  column={column}
                  columnId={columnId}
                />
              );
            })}
          </DragDropContext>
        </Flex>
      )}
    </Stack>
  );
}
