import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

export const LoadingSpinner = () => {
  return (
    <Center
      paddingTop="16%"
      top="50%"
      left="50%"
      transform="translateY(-50%, -50%)"
    >
      <Spinner
        thickness="6px"
        speed="0.65s"
        color="blue.500"
        w="150px"
        h="150px"
      />
    </Center>
  );
};
