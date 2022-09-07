import React, { Component, Fragment } from "react";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import authService from "./AuthorizeService";
import { ApplicationPaths } from "./ApiAuthorizationConstants";
import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import { Button, Icon } from "@chakra-ui/react";
import UserProfile from "../navBar/UserProfile";

export class LoginMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null,
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser(),
    ]);
    this.setState({
      isAuthenticated,
      userName: user && user.name,
      user,
    });
  }

  render() {
    const { isAuthenticated, userName, user } = this.state;
    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return this.anonymousView(registerPath, loginPath);
    } else {
      const profilePath = `/accountProfile`;
      const logoutPath = {
        pathname: `${ApplicationPaths.LogOut}`,
        state: { local: true },
      };
      return this.authenticatedView(userName, profilePath, logoutPath, user);
    }
  }

  authenticatedView(userName, profilePath, logoutPath, user) {
    return (
      <>
        <UserProfile
          userName={userName}
          profilePath={profilePath}
          logoutPath={logoutPath}
          loggedUser={user}
        />
      </>
    );
  }

  anonymousView(registerPath, loginPath) {
    return (
      <Fragment>
        <NavLink tag={Link} className="text-dark" to={registerPath}>
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"gray.400"}
            _hover={{
              bg: "gray.300",
            }}
          >
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={FiPlusCircle}
            />
            Register
          </Button>
        </NavLink>
        <NavLink tag={Link} className="text-dark" to={loginPath}>
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"blue.400"}
            href={loginPath}
            _hover={{
              bg: "blue.300",
            }}
          >
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={FiLogIn}
            />
            Login
          </Button>
        </NavLink>
      </Fragment>
    );
  }
}
