import React, { Component } from "react";
import { Box, Image, Text, Container, Flex, VStack } from "@chakra-ui/react";

export const Home = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <Flex h="100vh" py={20}>
        <VStack
          w="full"
          h="full"
          p={10}
          spacing={10}
          alignItems="flex-start"
        ></VStack>
        <VStack
          w="full"
          h="full"
          p={10}
          spacing={10}
          alignItems="flex-start"
          bg="gray.50"
        ></VStack>
        <VStack
          w="full"
          h="full"
          p={10}
          spacing={10}
          alignItems="flex-start"
          bg="gray.50"
        >
          <Box
            m="8px"
            p="8px"
            border="1px"
            rounded="10px"
            borderColor="gray.300"
            boxShadow="md"
            bg="lavender"
            color="#2d383c"
            fontSize="2rem"
            textAlign="center"
            fontFamily="Consolas"
            w="400px"
            h="400px"
          >
            <Image
              rounded="0.5rem"
              src="https://finalspaceapi.com/img/gary_goodspeed.webp"
              alt="Gary Goodspeed"
            />

            <Text>Gary Goodspeed</Text>
          </Box>
        </VStack>
      </Flex>
    </Container>
  );
};
