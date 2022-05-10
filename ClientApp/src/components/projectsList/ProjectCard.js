import React from "react";

import {
  Center,
  Heading,
  Image,
  Button,
  Stack,
  Text,
  useColorModeValue,
  IconButton,
  Box,
} from "@chakra-ui/react";

import { SettingsIcon } from "@chakra-ui/icons";

export const ProjectCard = ({ project }) => {
  return (
    <Center p={3}>
      <Button
        borderWidth="1px"
        borderRadius="xl"
        // w={{ sm: "100%", md: "480px" }}
        // height={{ sm: "180px", md: "10rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("#f4f7fe", "#0b1437")}
        boxShadow={"xl"}
        padding={8}
        paddingY={20}
      >
        <Box bg="transparent">
          <Image w={10} h={10} src={`Icons/icon_${project.icon}.png`} />
        </Box>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize={"xl"} fontFamily={"body"}>
            {project.title}
          </Heading>
          <Text
            isTruncated={true}
            nrOfLines={2}
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            {project.description}
          </Text>
        </Stack>
        <Stack>
          <IconButton
            variant="outline"
            colorScheme="blue"
            w={"30px"}
            h={"40px"}
            icon={<SettingsIcon />}
          />
        </Stack>
      </Button>
    </Center>
  );
};
