import React, { useContext, useEffect } from "react";
import {
  Box,
  Flex,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { FiHome } from "react-icons/fi";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { GoTasklist } from "react-icons/go";

import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { LoginMenu } from "../api-authorization/LoginMenu";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { Logo } from "./Logo";
import { NavToggle } from "./NavToggle";
import { AuthContext } from "../../context/AuthContext";
import { ProjectContext } from "../../context/ProjectContext";
import { SettingsIcon } from "@chakra-ui/icons";

export const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { navBarVisible, isProjectOwner } = useContext(AuthContext);
  const { selectedProject } = useContext(ProjectContext);

  useEffect(() => {}, [selectedProject]);

  const LinkItems = [
    {
      label: "Dashboard",
      icon: FiHome,
      href: `/dashboard/${selectedProject ? selectedProject.id : ""}`,
    },
    {
      label: "Overview",
      icon: VscTypeHierarchySub,
      href: `/overview/${selectedProject ? selectedProject.id : ""}`,
    },
    {
      label: "Tasks",
      icon: GoTasklist,
      href: `/tasks/${selectedProject ? selectedProject.id : ""}`,
    },
  ];

  return (
    <Box>
      <Flex
        bg={useColorModeValue("gray.100", "gray.700")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 2 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <NavToggle isOpen={isOpen} onToggle={onToggle} />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Logo />
          {navBarVisible && (
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav linkItems={LinkItems} />
            </Flex>
          )}
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <ColorModeSwitcher />
          <LoginMenu />
          {navBarVisible && isProjectOwner && (
            <Button
              as={IconButton}
              aria-label="Options"
              icon={<SettingsIcon />}
              colorScheme="blue"
              w={"30px"}
              h={"40px"}
            />
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav linkItems={LinkItems} />
      </Collapse>
    </Box>
  );
};
