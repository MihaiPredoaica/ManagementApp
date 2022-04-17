import React from "react";
import { Box } from "@chakra-ui/react";
import { HiX, HiOutlineMenu } from "react-icons/hi";

export const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <HiX /> : <HiOutlineMenu />}
    </Box>
  );
};
