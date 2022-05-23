import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { ExternalLinkIcon, SettingsIcon } from "@chakra-ui/icons";
import { EditProjectButton } from "./EditProjectButton";
import { DeleteProjectButton } from "./DeleteProjectButton";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";

export const ProjectSettingsMenu = ({ project }) => {
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
        <DeleteProjectButton id={project.id} />
        <EditProjectButton project={project} />
      </MenuList>
    </Menu>
  );
};
