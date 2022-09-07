import React from "react";
import { useColorModeValue, Image, Box } from "@chakra-ui/react";

export const TaskTypeTableIcon = ({ icon }) => {
  return (
    <Box
      padding={1}
      borderWidth="1px"
      borderRadius="md"
      w={10}
      h={10}
      justifyContent="center"
      bg={useColorModeValue("#3182ce", "#90cdf4")}
    >
      <Image
        alignContent="center"
        w={8}
        h={8}
        src={`TaskTypeIcons/icon${icon}.svg`}
      />
    </Box>
  );
};
