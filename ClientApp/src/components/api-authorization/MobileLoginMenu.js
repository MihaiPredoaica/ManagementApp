import { Flex, Icon, Stack } from "@chakra-ui/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ApplicationPaths } from "./ApiAuthorizationConstants";
import authService from "./AuthorizeService";
import { FiLogOut, FiLogIn, FiPlusCircle, FiUser } from "react-icons/fi";

export class MobileLoginMenu extends Component {
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
      const profilePath = `/accountProfile`;
      const logoutPath = {
        pathname: `${ApplicationPaths.LogOut}`,
        state: { local: true },
      };
      return this.authenticatedView(userName, profilePath, logoutPath);
    }
  }

  authenticatedView(userName, profilePath, logoutPath) {
    return (
      // <Fragment>
      //   <NavItem>
      //     <NavLink tag={Link} className="text-dark" to={profilePath}>
      //       Hello {userName}
      //     </NavLink>
      //   </NavItem>
      //   <Button
      //       display={{ base: "none", md: "inline-flex" }}
      //       fontSize={"sm"}
      //       fontWeight={600}
      //       color={"white"}
      //       bg={"pink.400"}
      //       href={logoutPath}
      //       _hover={{
      //         bg: "pink.300",
      //       }}
      //     >
      //       <Icon
      //         mr="4"
      //         fontSize="16"
      //         _groupHover={{
      //           color: "white",
      //         }}
      //         as={FiLogOut}
      //       />
      //       Logout

      //     </Button>
      // </Fragment>
      <>
        <Stack spacing={4}>
          <Link
            to={profilePath}
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
          >
            <Flex
              align="center"
              p="2"
              mx="2"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "cyan.400",
                color: "white",
              }}
            >
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: "white",
                }}
                as={FiUser}
              />
              Account Profile
            </Flex>
          </Link>
        </Stack>
        <Stack spacing={4}>
          <Link
            to={logoutPath}
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
          >
            <Flex
              align="center"
              p="2"
              mx="2"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "cyan.400",
                color: "white",
              }}
            >
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: "white",
                }}
                as={FiLogOut}
              />
              Logout
            </Flex>
          </Link>
        </Stack>
      </>
    );
  }

  anonymousView(registerPath, loginPath) {
    return (
      <>
        <Stack spacing={4}>
          <Link
            to={loginPath ?? "#"}
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
          >
            <Flex
              align="center"
              p="2"
              mx="2"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "cyan.400",
                color: "white",
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
            </Flex>
          </Link>
        </Stack>

        <Stack spacing={4}>
          <Link
            to={registerPath ?? "#"}
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
          >
            <Flex
              align="center"
              p="2"
              mx="2"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "gray.400",
                color: "white",
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
            </Flex>
          </Link>
        </Stack>
      </>
    );
  }
}
