import React from 'react';
import { useHistory } from 'react-router-dom';
import { Text, Flex, Button, useColorModeValue, Icon, Spacer } from "@chakra-ui/react";
import { FiPlusCircle } from 'react-icons/fi';

export const AddProjectButton = () => {
    return (
    <>
    <Spacer />
    <Flex
        h="20vh"
        alignItems="center"
        padding={30}
        >
        <Button
          px={8}
          bg={useColorModeValue('gray.200', 'gray.500')}
          color={useColorModeValue('black.700', 'white.700')}
          w="200px"
          h="60px"
          rounded={'100'}
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
      </>);
} 