import { useColorMode, Button } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";

export const ColorModeSwitcher = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button w={"30px"} h={"40px"} onClick={toggleColorMode}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
