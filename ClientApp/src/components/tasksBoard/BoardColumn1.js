import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "./Task1";

const renderMenu = () => {
  return (
    <Menu closeOnBlur closeOnSelect>
      <MenuButton
        as={Button}
        size="sm"
        // @ts-ignore
        variant="ghost"
      >
        <Icon name="chevron-down" />
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            // setIsEditingGroup(true);
            // setStatusTitle(column?.title || "");
          }}
        >
          Edit Status Name
        </MenuItem>
        <MenuItem>Remove Status</MenuItem>
      </MenuList>
    </Menu>
  );
};

export const BoardColumn = ({ columnId, column }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      bg={useColorModeValue("#f4f7fe", "#0b1437")}
      boxShadow={"xl"}
      padding={5}
      key={columnId}
      margin={5}
    >
      <Flex mb={4} px={2} justify="space-between" align="center">
        <Text fontSize="md" fontWeight="bold">
          {column.name} {renderMenu()}
        </Text>
      </Flex>
      <div style={{ margin: 8 }}>
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver
                    ? "lightblue"
                    : "lightgrey",
                  padding: 4,
                  width: 250,
                  minHeight: 300,
                }}
              >
                {column.items.map((item, index) => {
                  return <Task item={item} index={index} />;
                })}
                {provided.placeholder}
              </Box>
            );
          }}
        </Droppable>
      </div>
    </Box>
  );
};
