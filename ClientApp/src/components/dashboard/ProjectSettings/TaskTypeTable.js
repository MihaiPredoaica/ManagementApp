import {
  Stack,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import useTaskTypeQuery from "../hooks/useTaskTypeQuery";
import { AddTaskTypeModal } from "./AddTaskTypeModal";
import { TaskTypeSettingsMenu } from "./TaskTypeSettingsMenu";
import { TaskTypeTableIcon } from "./TaskTypeTableIcon";

export const TaskTypeTable = (props) => {
  const stackColor = useColorModeValue("#cacafe", "#0b1437");

  const { taskTypes } = useTaskTypeQuery(props.project?.id);

  return (
    <Stack borderRadius="xl" bg={stackColor} flex={1} mt={15} padding={3}>
      <Flex>
        <Text
          fontSize="large"
          fontWeight="bold"
          paddingLeft={"10px"}
          width={"95%"}
        >
          Task Types
        </Text>
        <AddTaskTypeModal project={props?.project} />
      </Flex>
      {taskTypes?.length > 0 ? (
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Icon</Th>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {taskTypes
                ?.filter((taskType) => taskType.icon !== 16)
                .map((taskType) => (
                  <Tr key={taskType.id}>
                    <Td>
                      <TaskTypeTableIcon icon={taskType.icon} />
                    </Td>
                    <Td>{taskType.name}</Td>
                    <Td>{taskType.description}</Td>
                    <Td>
                      <TaskTypeSettingsMenu taskType={taskType} />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text
          fontSize="large"
          noOfLines={3}
          paddingLeft={"10px"}
          paddingBottom={"10px"}
        >
          No users are asigned to the project. They can be added to the project
          via the add task types button in the corner.
        </Text>
      )}
    </Stack>
  );
};
