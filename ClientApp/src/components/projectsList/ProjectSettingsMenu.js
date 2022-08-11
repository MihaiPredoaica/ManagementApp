import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import React from "react";
import { SettingsIcon } from "@chakra-ui/icons";
import { EditProjectButton } from "./EditProjectButton";
import { DeleteProjectButton } from "./DeleteProjectButton";

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
