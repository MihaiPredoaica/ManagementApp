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
} from "@chakra-ui/react";
import React from "react";

export const UsersTable = (props) => {
  const users = props.users;
  const stackColor = useColorModeValue("#cacafe", "#0b1437");

  return (
    <Stack
      borderRadius="xl"
      bg={stackColor}
      flex={1}
      mt={15}
      padding={5}
      mr={10}
    >
      <Text
        fontSize="large"
        fontWeight="bold"
        paddingLeft={"10px"}
        paddingBottom={"10px"}
      >
        Users
      </Text>
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
            {users?.map((user) => (
              <Tr key={user.id}>
                <Td>{user.userName}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Button
                    as={IconButton}
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
    </Stack>
  );
};
