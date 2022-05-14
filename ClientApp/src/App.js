import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";
import { Layout } from "./components/Layout";
import { TasksBoard } from "./components/tasksBoard/TasksBoard";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import { Overview } from "./components/overview/Overview";
import { ProjectsList } from "./components/projectsList/ProjectsList";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Switch>
          <AuthorizeRoute path="/home" component={ProjectsList} />
          <AuthorizeRoute path="/overview" component={Overview} />
          <AuthorizeRoute path="/tasks" component={TasksBoard} />
          <Route
            path={ApplicationPaths.ApiAuthorizationPrefix}
            component={ApiAuthorizationRoutes}
          />
          <Redirect path="*" to="/home" />
        </Switch>
      </Layout>
    );
  }
}
