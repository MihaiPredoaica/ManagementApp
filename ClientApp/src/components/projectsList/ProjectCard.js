import React from 'react';

import {
    Center,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export const ProjectCard = ({project}) => {
    return (
      <Center py={6}>
        <Stack
          borderWidth="1px"
          borderRadius="xl"
          w={{ sm: '100%', md: '540px' }}
          height={{ sm: '200px', md: '10rem' }}
          direction={{ base: 'column', md: 'row' }}
          bg={useColorModeValue('blue.50', 'blue.900')}
          boxShadow={'xl'}
          padding={10}>
          <Flex bg="transparent">
            <Image
              boxSize="100%"
              src={
                `Icons/icon_${project.icon}.png`
              }
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}>
            <Heading fontSize={'2xl'} fontFamily={'body'}>
            {project.title}
            </Heading>
            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}>
              {project.description}
            </Text>
          </Stack>
        </Stack>
      </Center>
    );
  }