import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import {
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  SettingsIcon,
} from "@chakra-ui/icons";

export const ProjectSettingsMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<SettingsIcon />}
        variant="outline"
        colorScheme="blue"
        w={"30px"}
        h={"40px"}
      />
      <MenuList>
        <MenuItem icon={<ExternalLinkIcon />}>Go to Project</MenuItem>
        <MenuItem icon={<DeleteIcon />}>Delete Project</MenuItem>
        <MenuItem icon={<EditIcon />}>Edit Project</MenuItem>
      </MenuList>
    </Menu>
  );
};
