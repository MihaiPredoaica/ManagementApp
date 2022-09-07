import { IconButton, Menu, MenuButton, MenuList, Flex } from "@chakra-ui/react";
import React from "react";
import { SettingsIcon } from "@chakra-ui/icons";
import { DeleteTaskButton } from "./DeleteTaskButton";
import { EditTaskButton } from "./EditTaskButton";
import { LoggingButton } from "./LoggingButton";

export const TaskSettingsMenu = ({ taskStageList, task }) => {
  return (
    <Flex paddingLeft={10} paddingBottom={2}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<SettingsIcon />}
          variant="outline"
          colorScheme="blue"
          w={"15px"}
          h={"20px"}
        />
        <MenuList>
          <EditTaskButton taskStageList={taskStageList} task={task} />
          <DeleteTaskButton task={task} />
          <LoggingButton task={task} />
        </MenuList>
      </Menu>
    </Flex>
  );
};
