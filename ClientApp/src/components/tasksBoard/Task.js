import {
  Heading,
  Image,
  Stack,
  useColorMode,
  Box,
  Flex,
  LinkBox,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskSettingsMenu } from "./TaskSettingsMenu";

export const Task = ({ taskStageList, item, index }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "whiteAlpha.900", dark: "gray.800" };
  const imageColor = { light: "gray.100", dark: "#90cdf4" };
  return (
    <Draggable
      key={item.id.toString()}
      draggableId={item.id.toString()}
      index={index}
    >
      {(provided, snapshot) => {
        return (
          <Flex padding={1}>
            <Box
              borderWidth="1px"
              borderRadius="xl"
              w={"100%"}
              maxw={{ sm: "500px", md: "480px" }}
              maxHeight={"400px"}
              minH={"50px"}
              direction={{ base: "column", md: "row" }}
              bg={bgColor[colorMode]}
              boxShadow={"xl"}
              {...provided.draggableProps}
              // {...dragHandleProps}
              ref={provided.innerRef}
            >
              <LinkBox as="article">
                <Flex>
                  <Flex alignItems="center" {...provided.dragHandleProps}>
                    <Box
                      padding={2}
                      margin={2}
                      borderWidth="1px"
                      borderRadius="md"
                      maxHeight="80px"
                      bg={imageColor[colorMode]}
                    >
                      <Image
                        w={5}
                        h={5}
                        src={`TaskTypeIcons/icon${item?.type?.icon}.svg`}
                      />
                    </Box>

                    <Stack
                      flex={1}
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Heading
                        px={3}
                        fontSize={"md"}
                        fontFamily={"body"}
                        noOfLines={1}
                        width={"180px"}
                        minW={"160px"}
                      >
                        {/* <LinkOverlay href={"/dashboard/" + project.id}>
                          {project.name}
                        </LinkOverlay> */}
                        {item?.name}
                      </Heading>
                    </Stack>
                  </Flex>
                </Flex>
              </LinkBox>
              <Flex paddingLeft={2}>
                <Text
                  as="b"
                  fontSize={"xs"}
                  fontFamily={"body"}
                  noOfLines={1}
                  width={"130px"}
                  minW={"130px"}
                >
                  {/* <LinkOverlay href={"/dashboard/" + project.id}>
                          {project.name}
                        </LinkOverlay> */}
                  Remaining: {item?.estimation - item?.logged}h
                </Text>
                <TaskSettingsMenu taskStageList={taskStageList} task={item} />
              </Flex>
            </Box>
          </Flex>
        );
      }}
    </Draggable>
  );
};
