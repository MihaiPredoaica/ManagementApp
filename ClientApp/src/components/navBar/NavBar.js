import React from "react";
import {
  Box,
  Flex,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
} from "react-icons/fi";

import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { LoginMenu } from "../api-authorization/LoginMenu";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { Logo } from "./Logo";
import { NavToggle } from "./NavToggle";


const LinkItems = [
  {
    label: "Home",
    icon: FiHome,
    href: "/",
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
  {
    label: "Counter",
    icon: FiTrendingUp,
    href: "/counter",
    // children: [
    //   {
    //     label: "Job Board",
    //     subLabel: "Find your dream design job",
    //     href: "#",
    //   },
    //   {
    //     label: "Freelance Projects",
    //     subLabel: "An exclusive list for contract work",
    //     href: "#",
    //   },
    // ],
  },
  { label: "Fetch Data", icon: FiCompass, href: "/fetch-data" },
];

export const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
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
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav linkItems={LinkItems} />
          </Flex>
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
