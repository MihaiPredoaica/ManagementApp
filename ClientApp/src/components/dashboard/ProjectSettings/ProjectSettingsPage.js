import { Stack, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { ProjectContext } from "../../../context/ProjectContext";
import { LoadingSpinner } from "../../generalComponents/LoadingSpinner";
import useDashboardQuery from "../hooks/useDashboardQuery";
import { UsersTable } from "./UsersTable";
import { PageHeader } from "../PageHeader";
import { TaskTypeTable } from "./TaskTypeTable";

export const ProjectSettingsPage = () => {
  const { setNavBarVisible } = useContext(AuthContext);
  const { setSelectedProject } = useContext(ProjectContext);
  const { id } = useParams();

  useEffect(() => {
    setNavBarVisible(true);
    setSelectedProject(project);
  });

  const { project, projectLoading } = useDashboardQuery(id);

  useEffect(() => {
    setNavBarVisible(true);
  });

  if (projectLoading) return <LoadingSpinner />;

  return (
    <Stack>
      <PageHeader showProjectSettingsButton={false} project={project} />
      <Wrap>
        <WrapItem width={"50%"}>
          <UsersTable project={project} />
        </WrapItem>
        <WrapItem width={"48.7%"}>
          <TaskTypeTable project={project} />
        </WrapItem>
      </Wrap>
    </Stack>
  );
};
