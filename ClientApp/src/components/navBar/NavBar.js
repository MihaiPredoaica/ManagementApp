import React, { useContext } from "react";
import {
  Box,
  Flex,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
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

const LinkItems = [
  {
    label: "Dashboard",
    icon: FiHome,
    href: "/dashboard",
    // children: [
    //   {
    //     label: "Explore Design Work",
    //     subLabel: "Trending Design to inspire you",
    //     href: "#",
    //   },
    //   {
    //     label: "New & Noteworthy",
    //     subLabel: "Up-and-coming Designers",
    //     href: "#",
    //   },
    // ],
  },
  { label: "Overview", icon: VscTypeHierarchySub, href: "/overview" },
  { label: "Tasks", icon: GoTasklist, href: "/tasks" },
];

export const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { navBarVisible } = useContext(AuthContext);

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
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav linkItems={LinkItems} />
      </Collapse>
    </Box>
  );
};
