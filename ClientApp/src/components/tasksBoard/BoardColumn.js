import { Box, Flex, Text, useColorModeValue, Divider } from "@chakra-ui/react";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "./Task";

export const BoardColumn = ({ taskStageList, columnId, column }) => {
  const stackColor = useColorModeValue("#cacafe", "#0b1437");
  const deviderColor = useColorModeValue("#1a202c", "white");

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      bg={stackColor}
      boxShadow={"xl"}
      padding={5}
      key={columnId}
      margin={5}
    >
      <Flex mb={4} px={2} justify="space-between" align="center">
        <Text fontSize="md" fontWeight="bold">
          {column?.name}
        </Text>
      </Flex>
      <Divider bg={deviderColor} />
      <Flex style={{ margin: 8 }} bg={stackColor}>
        <Droppable droppableId={columnId} key={columnId} bg={stackColor}>
          {(provided, snapshot) => {
            return (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: stackColor,
                  padding: 2,
                  width: 250,
                  minHeight: 300,
                }}
              >
                {column.items.map((item, index) => {
                  return (
                    <Task
                      taskStageList={taskStageList}
                      item={item}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </Box>
            );
          }}
        </Droppable>
      </Flex>
    </Box>
  );
};
