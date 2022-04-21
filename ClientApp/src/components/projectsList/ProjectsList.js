import React from "react";
import { Box, Image, Text, Container, Flex, VStack, Button, useColorModeValue, Icon } from "@chakra-ui/react";
import { FiPlusCircle } from 'react-icons/fi';

export const ProjectsList = () => {
  return (
  <>
    <Flex
      h="20vh"
      alignItems="center"
      >
        
      <Button
        px={8}
        bg={useColorModeValue('gray.200', 'gray.500')}
        color={useColorModeValue('black.700', 'white.700')}
        w="200px"
        h="60px"
        rounded={'md'}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}>
        <Icon
              mr="4"
              fontSize="35"
              _groupHover={{
                color: "black",
              }}
              as={FiPlusCircle}
        />
        <Text >
          Add Project
        </Text>
      </Button>
    </Flex>
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
  </>
  );
};
