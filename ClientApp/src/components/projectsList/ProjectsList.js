import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  SimpleGrid,
  Heading,
  useColorModeValue,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ProjectCard } from "./ProjectCard";
import { AddProjectButton } from "./AddProjectButton";
import authService from "../api-authorization/AuthorizeService";

export const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const token = await authService.getAccessToken();
    const data = await fetch("project", {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    const json = await data.json();
    return json;
  };

  const queryClient = useQueryClient();

  const postProject = async () => {};

  // Queries
  const { data, status } = useQuery("projectList", fetchProjects);

  // Mutations

  const mutation = useMutation(postProject, {
    onSuccess: () => {
      // Invalidate and refetch

      queryClient.invalidateQueries("projectList");
    },
  });
  console.log(data);

  return (
    <Stack>
      <AddProjectButton />
      <Stack
        borderRadius="xl"
        bg={useColorModeValue("#cacafe", "#0b1437")}
        flex={1}
        mt={15}
        wrap="nowrap"
      >
        <Heading margin={"10px"} marginLeft={"30px"}>
          My Projects
        </Heading>
        <SimpleGrid columns={3} spacingX="20px" spacingY="10px">
          {data?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
};

const ProjectList = [
  {
    id: 0,
    name: "Project 1",
    description:
      "Description for project 1 here to stay ubuyb uyb uyb uyb uybyu buyb uybuybyub buybyub",
    icon: 0,
  },
  {
    id: 1,
    name: "Project 2",
    description: "Description for project 2 here to stay",
    icon: 1,
  },
  {
    id: 2,
    name: "Project 3",
    description: "Description for project 3 here to stay",
    icon: 2,
  },
  {
    id: 3,
    name: "Project 4",
    description: "Description for project 4 here to stay",
    icon: 3,
  },
  {
    id: 4,
    name: "Project 5",
    description: "Description for project 5 here to stay",
    icon: 4,
  },
];
