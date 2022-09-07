import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { ProjectContext } from "../../../context/ProjectContext";
import useProjectQuery from "../../projectsList/hooks/useProjectQuery";
import useDashboardQuery from "../hooks/useDashboardQuery";

export const EditUsersButton = () => {
  const { selectedProject, setSelectedProject } = useContext(ProjectContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();

  const onModalOpen = () => {
    setSelectedUsers(selectedProject.selectedUsers);
    onOpen();
  };
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const { editMutation } = useDashboardQuery(id);
  const { users } = useProjectQuery();

  const handleSaveClick = async () => {
    editMutation.mutate(
      { ...selectedProject, selectedUsers },
      {
        onSuccess: () => {
          setSelectedProject({ ...selectedProject, selectedUsers });
          onClose();
        },
      }
    );
  };

  return (
    <>
      <Button
        onClick={onModalOpen}
        as={IconButton}
        aria-label="Options"
        icon={<EditIcon />}
        colorScheme="blue"
        w={"25px"}
        h={"35px"}
      />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl pb={6}>
              <FormLabel>Users assigned to the project: </FormLabel>
              <Select
                value={selectedUsers.map((user) => ({
                  label: user.userName,
                  value: user,
                }))}
                isMulti
                name="Users"
                onChange={(e) => {
                  setSelectedUsers(e.map((s) => s.value));
                }}
                options={users
                  ?.filter((user) => user.id !== currentUser?.sub)
                  .map((user) => ({
                    label: user.userName,
                    value: user,
                  }))}
                placeholder="Select users..."
                closeMenuOnSelect={false}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={async () => await handleSaveClick()}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
