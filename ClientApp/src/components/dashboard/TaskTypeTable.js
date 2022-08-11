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
} from "@chakra-ui/react";
import React from "react";

export const TaskTypeTable = (props) => {
  const taskTypes = props.taskTypes;
  const stackColor = useColorModeValue("#cacafe", "#0b1437");

  return (
    <Stack borderRadius="xl" bg={stackColor} flex={1} mt={15} padding={5}>
      <Text
        fontSize="large"
        fontWeight="bold"
        paddingLeft={"10px"}
        paddingBottom={"10px"}
      >
        Task Types
      </Text>
      {taskTypes?.length > 0 ? (
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Icon</Th>
                <Th>Name</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {taskTypes?.map((taskType) => (
                <Tr key={taskType.id}>
                  <Td>{taskType.icon}</Td>
                  <Td>{taskType.name}</Td>
                  <Td>{taskType.description}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text
          fontSize="large"
          noOfLines={3}
          maxW={"430px"}
          paddingLeft={"10px"}
          paddingBottom={"10px"}
        >
          No task types exist at the moment. They can be added by the project
          owner via the project settings page.
        </Text>
      )}
    </Stack>
  );
};
