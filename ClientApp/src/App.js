import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { Layout } from "./components/Layout";
import { TasksBoard } from "./components/tasksBoard/TasksBoard";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import { Overview } from "./components/overview/Overview";
import { ProjectsList } from "./components/projectsList/ProjectsList";

import "./custom.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/AuthContext";
import { Dashboard } from "./components/dashboard/Dashboard";
import { ProjectProvider } from "./context/ProjectContext";
import { UserProfilePage } from "./components/useProfile/UserProfilePage";
import { ProjectSettingsPage } from "./components/dashboard/ProjectSettings/ProjectSettingsPage";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProjectProvider>
          <Layout>
            <Switch>
              <AuthorizeRoute path="/home" component={ProjectsList} />
              <AuthorizeRoute path="/dashboard/:id" component={Dashboard} />
              <AuthorizeRoute path="/overview/:id" component={Overview} />
              <AuthorizeRoute path="/tasks/:id" component={TasksBoard} />
              <AuthorizeRoute
                path="/settings/:id"
                component={ProjectSettingsPage}
              />
              <AuthorizeRoute
                path="/accountProfile"
                component={UserProfilePage}
              />
              <Route
                path={ApplicationPaths.ApiAuthorizationPrefix}
                component={ApiAuthorizationRoutes}
              />
              <Redirect path="*" to="/home" />
            </Switch>
          </Layout>
        </ProjectProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
