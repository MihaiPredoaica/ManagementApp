import React from "react";
import { Link, Flex, Image } from "@chakra-ui/react";

export const Logo = () => {
  return (
    <Link
      href="/"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        display={{ base: "none", md: "flex" }}
        align="flex-start"
        p="2"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "transparent.400",
          color: "white",
        }}
      >
        <Image maxW={"30px"} maxH={"30px"} rounded="0.5rem" src="Logo.ico" />
      </Flex>
    </Link>
  );
};
