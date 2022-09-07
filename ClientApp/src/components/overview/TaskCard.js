import {
  Heading,
  Image,
  Stack,
  useColorMode,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import React from "react";

export const TaskCard = ({ item }) => {
  console.log(item);
  const { colorMode } = useColorMode();
  const bgColor = { light: "#ffffff", dark: "gray.800" };
  const imageColor = { light: "gray.100", dark: "#90cdf4" };
  return (
    <Flex paddingRight={10}>
      <Box
        borderWidth="1px"
        borderRadius="xl"
        w={"250px"}
        maxw={{ sm: "500px", md: "480px" }}
        maxHeight={"400px"}
        minH={"50px"}
        direction={{ base: "column", md: "row" }}
        bg={bgColor[colorMode]}
        boxShadow={"xl"}
      >
        <Flex>
          <Flex alignItems="center">
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
                {item?.name}
              </Heading>
            </Stack>
          </Flex>
        </Flex>
        {item?.type?.icon !== 16 && (
          <Flex paddingLeft={2}>
            <Text
              as="b"
              fontSize={"xs"}
              fontFamily={"body"}
              noOfLines={1}
              width={"130px"}
              minW={"130px"}
            >
              Remaining: {item?.estimation - item?.logged}h
            </Text>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};
