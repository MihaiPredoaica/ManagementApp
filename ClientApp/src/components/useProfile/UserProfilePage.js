import { Wrap, WrapItem } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import authService from "../api-authorization/AuthorizeService";
import { LoadingSpinner } from "../generalComponents/LoadingSpinner";
import useUserProfileQuery from "./hooks/useUserProfileQuery";
import { UserProfileForm } from "./UserProfileForm";

export const UserProfilePage = () => {
  const { setCurrentUser, currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function getCurrentUser() {
      setCurrentUser(await authService.getUser());
    }
    getCurrentUser();
  }, [setCurrentUser]);

  const { user, userLoading, editMutation } = useUserProfileQuery(
    currentUser?.sub
  );

  if (userLoading || !currentUser) return <LoadingSpinner />;

  return (
    <Wrap justify="center">
      <WrapItem>
        <UserProfileForm user={user} editMutation={editMutation} />
      </WrapItem>
    </Wrap>
  );
};
