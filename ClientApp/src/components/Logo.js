import React from "react";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";

export default function Logo(props) {
  const history = useHistory();

  function handleClick() {
    history.push("/");
  }

  return (
    <IconButton
      size="md"
      fontSize="larger"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={handleClick}
      icon={<HiOutlineClipboardCheck />}
      {...props}
    />
  );
}
