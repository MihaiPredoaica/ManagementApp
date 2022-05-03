import React from "react";
import { PseudoBox, Icon, Text } from "@chakra-ui/react";

export const AddNewTaskInput = ({ onClick }) => {
  return (
    <PseudoBox
      as="button"
      display="flex"
      width="100%"
      flexDirection="row"
      p={2}
      mb={2}
      boxShadow="xs"
      rounded="md"
      cursor="pointer"
      alignItems="center"
      _hover={{
        opacity: 0.5,
      }}
      opacity={8 / 10}
      onClick={onClick}
    >
      <Icon name="add" size="10px" />
      <Text fontSize="sm" pl={2}>
        Add New Task
      </Text>
    </PseudoBox>
  );
};