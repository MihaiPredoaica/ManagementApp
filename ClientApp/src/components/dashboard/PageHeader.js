import { AuthContext } from "../../context/AuthContext";
import { SettingsIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  IconButton,
  Button,
  Stack,
  Text,
  useColorModeValue,
  Box,
  Image,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import authService from "../api-authorization/AuthorizeService";

export const PageHeader = (props) => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { project, showProjectSettingsButton } = props;
  const stackColor = useColorModeValue("#cacafe", "#0b1437");

  useEffect(() => {
    async function getCurrentUser() {
      setCurrentUser(await authService.getUser());
    }
    getCurrentUser();
  }, [setCurrentUser]);

  const handleSettingsButtonClick = () => {
    history.push("/settings/" + project?.id);
  };

  return (
    <Flex borderRadius="xl" bg={stackColor} mt={15}>
      <Box
        mt={2.5}
        ml={3}
        padding={5}
        borderWidth="1px"
        borderRadius="xl"
        maxHeight="80px"
        bg={useColorModeValue("gray.100", "#90cdf4")}
      >
        <Image w={10} h={10} src={`Icons/icon_${project.icon}.png`} />
      </Box>
      <Stack flex={1}>
        <Heading marginTop={"10px"} marginLeft={"30px"}>
          {project?.name}
        </Heading>
        <Text fontSize="large" paddingLeft={"30px"} paddingBottom={"10px"}>
          {project?.description}
        </Text>
      </Stack>
      {currentUser?.sub === project?.ownerId && showProjectSettingsButton && (
        <Button
          onClick={handleSettingsButtonClick}
          href={"/settings/" + project.id}
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
