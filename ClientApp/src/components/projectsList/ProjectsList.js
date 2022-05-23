import React, { useContext, useEffect } from "react";
import {
  SimpleGrid,
  Heading,
  useColorModeValue,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ProjectCard } from "./ProjectCard";
import { AddProjectButton } from "./AddProjectButton";
import useProjectQuery from "./hooks/useProjectQuery";
import { AuthContext } from "../../context/AuthContext";
import authService from "../api-authorization/AuthorizeService";
import { LoadingSpinner } from "../generalComponents/LoadingSpinner";

export const ProjectsList = () => {
  const { projects, usersLoading, projectsLoading } = useProjectQuery();
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const stackColor = useColorModeValue("#cacafe", "#0b1437");

  useEffect(() => {
    async function getCurrentUser() {
      setCurrentUser(await authService.getUser());
    }
    getCurrentUser();
  }, [setCurrentUser]);

  if (usersLoading || projectsLoading) return <LoadingSpinner />;

  const myProjects = projects?.filter(
    (project) => project.ownerId === currentUser?.sub
  );
  const assignedProjects = projects?.filter(
    (project) =>
      project.selectedUsers?.filter((user) => user.id === currentUser?.sub)
        .length > 0
  );

  console.log(myProjects, assignedProjects, currentUser);

  return (
    <Stack>
      <AddProjectButton />
      {myProjects?.length === 0 && assignedProjects?.length === 0 && (
        <Stack borderRadius="xl" bg={stackColor} flex={1} mt={15}>
          <Heading margin={"10px"} marginLeft={"30px"}>
            No Projects!
          </Heading>
          <Text size="sm" padding={"10px"} paddingLeft={"30px"}>
            You can start by adding a project of your own!
          </Text>
        </Stack>
      )}
      {myProjects?.length > 0 && (
        <Stack borderRadius="xl" bg={stackColor} flex={1} mt={15} wrap="nowrap">
          <Heading margin={"10px"} marginLeft={"30px"}>
            My Projects
          </Heading>
          <SimpleGrid columns={3} spacingX="20px" spacingY="10px">
            {myProjects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </SimpleGrid>
        </Stack>
      )}
      {assignedProjects?.length > 0 && (
        <Stack borderRadius="xl" bg={stackColor} flex={1} mt={15} wrap="nowrap">
          <Heading margin={"10px"} marginLeft={"30px"}>
            Assigned Projects
          </Heading>
          <SimpleGrid columns={3} spacingX="20px" spacingY="10px">
            {assignedProjects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </SimpleGrid>
        </Stack>
      )}
    </Stack>
  );
};

// const ProjectList = [
//   {
//     id: 0,
//     name: "Project 1",
//     description:
//       "Description for project 1 here to stay ubuyb uyb uyb uyb uybyu buyb uybuybyub buybyub",
//     icon: 0,
//   },
//   {
//     id: 1,
//     name: "Project 2",
//     description: "Description for project 2 here to stay",
//     icon: 1,
//   },
//   {
//     id: 2,
//     name: "Project 3",
//     description: "Description for project 3 here to stay",
//     icon: 2,
//   },
//   {
//     id: 3,
//     name: "Project 4",
//     description: "Description for project 4 here to stay",
//     icon: 3,
//   },
//   {
//     id: 4,
//     name: "Project 5",
//     description: "Description for project 5 here to stay",
//     icon: 4,
//   },
// ];
