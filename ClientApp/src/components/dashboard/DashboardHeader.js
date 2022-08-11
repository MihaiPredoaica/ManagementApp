import { AuthContext } from "../../context/AuthContext";
import { SettingsIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import authService from "../api-authorization/AuthorizeService";

export const DashboardHeader = (props) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const project = props.project;
  const stackColor = useColorModeValue("#cacafe", "#0b1437");

  useEffect(() => {
    async function getCurrentUser() {
      setCurrentUser(await authService.getUser());
    }
    getCurrentUser();
  }, [setCurrentUser]);

  console.log(currentUser);
  return (
    <Flex borderRadius="xl" bg={stackColor} mt={15}>
      <Stack flex={1}>
        <Heading marginTop={"10px"} marginLeft={"30px"}>
          {project?.name}
        </Heading>
        <Text fontSize="large" paddingLeft={"30px"} paddingBottom={"10px"}>
          {project?.description}
        </Text>
      </Stack>
      {currentUser?.sub === project?.ownerId && (
        <Button
          m={15}
          as={IconButton}
          aria-label="Options"
          icon={<SettingsIcon />}
          colorScheme="blue"
          w={"30px"}
          h={"40px"}
        />
      )}
    </Flex>
  );
};
