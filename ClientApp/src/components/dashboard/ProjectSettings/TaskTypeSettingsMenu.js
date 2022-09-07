import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import React from "react";
import { SettingsIcon } from "@chakra-ui/icons";
import { EditTaskTypeModal } from "./EditTaskTypeModal";
import { DeleteTaskTypeModal } from "./DeleteTaskTypeModal";

export const TaskTypeSettingsMenu = ({ taskType }) => {
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
        <DeleteTaskTypeModal taskType={taskType} />
        <EditTaskTypeModal taskType={taskType} />
      </MenuList>
    </Menu>
  );
};
