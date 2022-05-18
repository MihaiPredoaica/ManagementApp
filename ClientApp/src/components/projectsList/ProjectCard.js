import React from "react";

import {
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Box,
  Flex,
} from "@chakra-ui/react";

import { ProjectSettingsMenu } from "./ProjectSettingsMenu";

export const ProjectCard = ({ project }) => {
  return (
    <Flex padding={3}>
      <Box
        borderWidth="1px"
        borderRadius="xl"
        maxw={{ sm: "500px", md: "480px" }}
        maxHeight={"300px"}
        minH={"100px"}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("#f4f7fe", "#0b1437")}
        boxShadow={"xl"}
        padding={3}
      >
        <Flex>
          <Flex alignItems="center">
            <Box
              padding={5}
              borderWidth="1px"
              borderRadius="xl"
              maxHeight="80px"
              bg={useColorModeValue("gray.100", "#0b1437")}
            >
              <Image w={10} h={10} src={`Icons/icon_${project.icon}.png`} />
            </Box>
            <Stack
              flex={1}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Heading px={3} fontSize={"xl"} fontFamily={"body"}>
                {project.name}
              </Heading>
              <Text
                maxWidth="100%"
                flexDirection="column"
                justifyContent="left"
                textAlign={"center"}
                noOfLines={2}
                color={useColorModeValue("gray.700", "gray.400")}
                px={3}
              >
                {project.description}
              </Text>
            </Stack>
          </Flex>
          <Stack>
            <ProjectSettingsMenu project={project} />
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
};
