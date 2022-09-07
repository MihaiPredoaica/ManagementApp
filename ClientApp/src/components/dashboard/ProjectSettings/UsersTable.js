import { DeleteIcon } from "@chakra-ui/icons";
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
  IconButton,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { EditUsersButton } from "./EditUsersButton";
import useDashboardQuery from "../hooks/useDashboardQuery";
import { ProjectContext } from "../../../context/ProjectContext";

export const UsersTable = (props) => {
  const stackColor = useColorModeValue("#cacafe", "#0b1437");
  const { selectedProject, setSelectedProject } = useContext(ProjectContext);
  const users = selectedProject?.selectedUsers;

  const { editMutation } = useDashboardQuery(props.project?.id);

  const handleUserDeleteFromTable = (userId) => {
    editMutation.mutate(
      {
        ...selectedProject,
        selectedUsers: users.filter((user) => user.id !== userId),
      },
      {
        onSuccess: () => {
          setSelectedProject({
            ...selectedProject,
            selectedUsers: users.filter((user) => user.id !== userId),
          });
        },
      }
    );
  };

  return (
    <Stack
      borderRadius="xl"
      bg={stackColor}
      flex={1}
      mt={15}
      padding={3}
      mr={10}
    >
      <Flex>
        <Text
          fontSize="large"
          fontWeight="bold"
          paddingLeft={"10px"}
          paddingBottom={"10px"}
          width={"95%"}
        >
          Users
        </Text>
        <EditUsersButton />
      </Flex>
      {users?.length > 0 ? (
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.map((user, index) => (
                <Tr key={user.id}>
                  <Td>{user.userName}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Button
                      as={IconButton}
                      onClick={() => {
                        handleUserDeleteFromTable(user.id);
                      }}
                      aria-label="Options"
                      icon={<DeleteIcon />}
                      variant="outline"
                      colorScheme="blue"
                    />
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
          via the edit users button in the corner.
        </Text>
      )}
    </Stack>
  );
};
