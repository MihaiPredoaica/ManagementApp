import React from "react";
import { Component } from "react";
import authService from "./AuthorizeService";
import { AuthenticationResultStatus } from "./AuthorizeService";
import {
  LoginActions,
  QueryParameterNames,
  ApplicationPaths,
} from "./ApiAuthorizationConstants";
import { LoadingSpinner } from "../generalComponents/LoadingSpinner";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: undefined,
    };
  }

  componentDidMount() {
    const action = this.props.action;
    switch (action) {
      case LoginActions.Login:
        this.login(this.getReturnUrl());
        break;
      case LoginActions.LoginCallback:
        this.processLoginCallback();
        break;
      case LoginActions.LoginFailed:
        const params = new URLSearchParams(window.location.search);
        const error = params.get(QueryParameterNames.Message);
        this.setState({ message: error });
        break;
      case LoginActions.Profile:
        this.redirectToProfile();
        break;
      case LoginActions.Register:
        this.redirectToRegister();
        break;
      default:
        throw new Error(`Invalid action '${action}'`);
    }
  }

  render() {
    const action = this.props.action;
    const { message } = this.state;

    if (!!message) {
      return <div>{message}</div>;
    } else {
      switch (action) {
        case LoginActions.Login:
          return <LoadingSpinner />;
        case LoginActions.LoginCallback:
          return <LoadingSpinner />;
        case LoginActions.Profile:
        case LoginActions.Register:
          return <div></div>;
        default:
          throw new Error(`Invalid action '${action}'`);
      }
    }
  }

  async login(returnUrl) {
    const state = { returnUrl };
    const result = await authService.signIn(state);
    switch (result.status) {
      case AuthenticationResultStatus.Redirect:
        break;
      case AuthenticationResultStatus.Success:
        await this.navigateToReturnUrl(returnUrl);
        break;
      case AuthenticationResultStatus.Fail:
        this.setState({ message: result.message });
        break;
      default:
        throw new Error(`Invalid status result ${result.status}.`);
    }
  }

  async processLoginCallback() {
    const url = window.location.href;
    const result = await authService.completeSignIn(url);
    switch (result.status) {
      case AuthenticationResultStatus.Redirect:
        throw new Error("Should not redirect.");
      case AuthenticationResultStatus.Success:
        await this.navigateToReturnUrl(
          ApplicationPaths.DefaultLoginRedirectPath
        );
        break;
      case AuthenticationResultStatus.Fail:
        this.setState({ message: result.message });
        break;
      default:
        throw new Error(
          `Invalid authentication result status '${result.status}'.`
        );
    }
  }

  getReturnUrl(state) {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get(QueryParameterNames.ReturnUrl);
    if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
      throw new Error(
        "Invalid return url. The return url needs to have the same origin as the current page."
      );
    }
    return (
      (state && state.returnUrl) || fromQuery || `${window.location.origin}/`
    );
  }

  redirectToRegister() {
    this.redirectToApiAuthorizationPath(
      `${ApplicationPaths.IdentityRegisterPath}?${
        QueryParameterNames.ReturnUrl
      }=${encodeURI(ApplicationPaths.Login)}`
    );
  }

  redirectToProfile() {
    this.redirectToApiAuthorizationPath(ApplicationPaths.IdentityManagePath);
  }

  redirectToApiAuthorizationPath(apiAuthorizationPath) {
    const redirectUrl = `${window.location.origin}/${apiAuthorizationPath}`;
    window.location.replace(redirectUrl);
  }

  navigateToReturnUrl(returnUrl) {
    window.location.replace(returnUrl);
  }
}
