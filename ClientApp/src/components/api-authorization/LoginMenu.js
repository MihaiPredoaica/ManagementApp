import React, { Component, Fragment } from "react";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import authService from "./AuthorizeService";
import { ApplicationPaths } from "./ApiAuthorizationConstants";
import { FiLogOut, FiLogIn, FiPlusCircle, FiUser } from "react-icons/fi";
import {
  Avatar,
  Button,
  Center,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

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
    });
  }

  render() {
    const { isAuthenticated, userName } = this.state;
    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return this.anonymousView(registerPath, loginPath);
    } else {
      const profilePath = `${ApplicationPaths.Profile}`;
      const logoutPath = {
        pathname: `${ApplicationPaths.LogOut}`,
        state: { local: true },
      };
      return this.authenticatedView(userName, profilePath, logoutPath);
    }
  }

  authenticatedView(userName, profilePath, logoutPath) {
    return (
      <Fragment>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar size={"sm"} src="user.png" marginX={2} />
          </MenuButton>
          <MenuList alignItems={"center"}>
            <br />
            <Center>
              <Avatar size={"2xl"} src="user.png" />
            </Center>
            <br />
            <Center>
              <p>{userName}</p>
            </Center>
            <br />
            <MenuDivider />
            <MenuItem>
              <NavLink tag={Link} to={profilePath}>
                <Icon
                  mr="4"
                  fontSize="16"
                  _groupHover={{
                    color: "white",
                  }}
                  as={FiUser}
                />
                Account Profile
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink tag={Link} to={logoutPath}>
                <Icon
                  mr="4"
                  fontSize="16"
                  _groupHover={{
                    color: "white",
                  }}
                  as={FiLogOut}
                />
                Logout
              </NavLink>
            </MenuItem>
          </MenuList>
        </Menu>
      </Fragment>
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
