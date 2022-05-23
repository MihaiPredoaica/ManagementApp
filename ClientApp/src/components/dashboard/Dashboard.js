import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LoadingSpinner } from "../generalComponents/LoadingSpinner";
import useDashboardQuery from "./hooks/useDashboardQuery";

export const Dashboard = () => {
  const { setNavBarVisible } = useContext(AuthContext);
  const { id } = useParams();

  const { project, projectLoading } = useDashboardQuery(id);

  console.log(project);

  useEffect(() => {
    setNavBarVisible(true);
  });

  if (projectLoading) return <LoadingSpinner />;

  return <p>This is the dashboard</p>;
};
