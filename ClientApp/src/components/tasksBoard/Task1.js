import { Flex, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

export const Task = ({ item, index }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "whiteAlpha.900", dark: "gray.800" };
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <Flex
            bg={bgColor[colorMode]}
            direction="column"
            // p={2}
            mb={2}
            boxShadow="md"
            rounded="md"
            onClick={() => console.log("Open Modal")}
            {...provided.draggableProps}
            // {...dragHandleProps}
            ref={provided.innerRef}
          >
            <Flex
              //  mb={2}
              justify="space-between"
              direction="row"
            >
              <Flex
                p={2}
                flex={1}
                justify="space-between"
                direction="column"
                wrap="nowrap"
                {...provided.dragHandleProps}
              >
                <Text fontSize="sm" userSelect="none">
                  {item?.content}
                </Text>
                {/* {task?.priority && task?.priority !== "none" && (
                  <Flex pt={2}>
                    <Badge userSelect="none" priority={task.priority}>
                      {task.priority}
                    </Badge>
                  </Flex>
                )} */}
              </Flex>
              {/* <Flex justify="flex-start" p={2}>
                {renderMenu()}
              </Flex> */}
            </Flex>
          </Flex>
        );
      }}
    </Draggable>
  );
};
