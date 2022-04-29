import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { ProjectCard } from "./ProjectCard";
import { AddProjectButton } from "./AddProjectButton";

export const ProjectsList = () => {
  return (
  <>
    <AddProjectButton />
    <SimpleGrid columns={3} spacingX='20px' spacingY='10px'>
      {ProjectList.map((project) => <ProjectCard key={project.id} project={project} /> )}
    </SimpleGrid>
          
  </>
  );
};

const ProjectList = [
    {
      id: 0,
      title: "Project 1",
      description: "Description for project 1 here to stay",
      icon: 0,
    },
    {
      id: 1,
      title: "Project 2",
      description: "Description for project 2 here to stay",
      icon: 1,
    },
    {
      id: 2,
      title: "Project 3",
      description: "Description for project 3 here to stay",
      icon: 2,
    },
    {
      id: 3,
      title: "Project 4",
      description: "Description for project 4 here to stay",
      icon: 3,
    },
    {
      id: 4,
      title: "Project 5",
      description: "Description for project 5 here to stay",
      icon: 4,
    }
];