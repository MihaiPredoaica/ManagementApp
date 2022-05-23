import React, { useContext } from "react";
import { Stack, useColorModeValue } from "@chakra-ui/react";
import { MobileNavItem } from "./MobileNavItem";
import { MobileLoginMenu } from "../api-authorization/MobileLoginMenu";
import { AuthContext } from "../../context/AuthContext";

export const MobileNav = ({ linkItems }) => {
  const { navBarVisible } = useContext(AuthContext);

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {navBarVisible &&
        linkItems.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      <MobileLoginMenu />
    </Stack>
  );
};
