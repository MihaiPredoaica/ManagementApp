import { Stack, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProjectContext } from "../../context/ProjectContext";
import { LoadingSpinner } from "../generalComponents/LoadingSpinner";
import useDashboardQuery from "./hooks/useDashboardQuery";
import { TasksChart } from "./TasksChart";
import { UsersTable } from "./UsersTable";
import { DashboardHeader } from "./DashboardHeader";
import { TaskTypeTable } from "./TaskTypeTable";

export const Dashboard = () => {
  const { setNavBarVisible } = useContext(AuthContext);
  const { setSelectedProject } = useContext(ProjectContext);
  const { id } = useParams();
  const { taskTypes } = [];

  const { project, projectLoading } = useDashboardQuery(id);

  useEffect(() => {
    setNavBarVisible(true);
    setSelectedProject(project);
  });

  if (projectLoading) return <LoadingSpinner />;

  return (
    <Stack>
      <DashboardHeader project={project} />
      <Wrap>
        <WrapItem>
          <TasksChart />
        </WrapItem>
        <WrapItem>
          <UsersTable users={project?.selectedUsers} />
        </WrapItem>
        <WrapItem>
          <TaskTypeTable taskTypes={taskTypes} />
        </WrapItem>
      </Wrap>
    </Stack>
  );
};
