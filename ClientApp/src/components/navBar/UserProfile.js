import React from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { NavLink } from "reactstrap";
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
import useUserProfileQuery from "../useProfile/hooks/useUserProfileQuery";

const UserProfile = ({ userName, profilePath, logoutPath, loggedUser }) => {
  const { user } = useUserProfileQuery(loggedUser?.sub);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar
          size={"sm"}
          src={user?.image ? user.image : "user.png"}
          marginX={2}
        />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <br />
        <Center>
          <Avatar size={"2xl"} src={user?.image ? user.image : "user.png"} />
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
  );
};

export default UserProfile;
