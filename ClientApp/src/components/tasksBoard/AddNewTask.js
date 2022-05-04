import React from "react";
import { Box, Icon, Text } from "@chakra-ui/react";

export const AddNewTaskInput = ({ onClick }) => {
  return (
    <Box
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
    </Box>
  );
};
