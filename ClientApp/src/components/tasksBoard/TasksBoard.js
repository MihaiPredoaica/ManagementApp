import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Flex } from "@chakra-ui/react";
import { BoardColumn } from "./BoardColumn";

export const TasksBoard = () => {
  const INITIAL_DATA = {
    tasks: [
      {
        id: "task-1",
        content: "Wash the dishes",
        priority: "low",
      },
      {
        id: "task-2",
        content: "Procratinate",
        priority: "high",
      },
      {
        id: "task-3",
        content: "Do some actual work",
        priority: "medium",
      },
      {
        id: "task-4",
        content: "Sleep, please! 😢😢😢😢",
        priority: "low",
      },
      {
        id: "task-5",
        content: "Stay awake at all costs!",
        priority: "high",
      },
    ],

    status: [
      {
        id: "column-1",
        title: "To Do",
        tasks: ["task-1", "task-2"],
      },
      {
        id: "column-2",
        title: "Doing",
        tasks: ["task-3", "task-4", "task-5"],
      },
    ],
  };

  const tasksByStatus = () => {
    const { tasks, status } = INITIAL_DATA;
    const statusValues = status.map((s) => s.id);
    const resolveTask = (taskId) => tasks.find((t) => t.id === taskId);
    console.log(status);
    const mapTasks = (taskAllIds) => taskAllIds.map(resolveTask);
    return statusValues.map((status) => ({
      ...status,
      tasks: mapTasks(status.tasks),
    }));
  };

  const moveTask = () => {};
  const createStatus = () => {};
  const editStatus = () => {};
  const editTask = () => {};
  const createTask = () => {};
  const deleteTask = () => {};

  useEffect(() => {
    const t = tasksByStatus();
    console.log(t);
  }, []);

  return (
    <Flex h="100%" direction="column">
      <Flex flex={1} mt={15} wrap="nowrap" overflowX="scroll">
        <DragDropContext onDragEnd={moveTask}>
          {/* {tasksByStatus.map((status) => {
            const column = status;
            return (
              <BoardColumn
                key={column.id}
                column={column}
                createStatus={createStatus}
                editStatus={editStatus}
                editTask={editTask}
                createTask={createTask}
                deleteTask={deleteTask}
              />
            );
          })} */}
          <BoardColumn
            key="new-column"
            createStatus={createStatus}
            editStatus={editStatus}
            editTask={editTask}
            createTask={createTask}
            deleteTask={deleteTask}
          />
        </DragDropContext>
      </Flex>
    </Flex>
  );
};
