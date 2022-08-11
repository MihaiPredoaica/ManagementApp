import { useMutation, useQueryClient, useQuery } from "react-query";
import authService from "../../api-authorization/AuthorizeService";

function useUserProfileQuery(id) {
  const queryClient = useQueryClient();

  const fetchUser = async (id) => {
    const token = await authService.getAccessToken();
    if (!id) return "";
    const data = await fetch(`user/${id}`, {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    const json = await data.json();
    return json;
  };

  const { data: user, isLoading: userLoading } = useQuery(
    ["currentUser", id],
    () => fetchUser(id),
    {
      refetchOnWindowFocus: false,
    }
  );

  const updateUser = async (user) => {
    console.log(user);
    // const token = await authService.getAccessToken();
    // const data = await fetch("user", {
    //   method: "PUT",
    //   body: JSON.stringify({
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //     image: user.image,
    //   }),
    //   headers: !token
    //     ? {}
    //     : {
    //         Authorization: `Bearer ${token}`,
    //         Accept: "application/json, text/plain",
    //         "Content-Type": "application/json;charset=UTF-8",
    //       },
    // });
    // const json = JSON.stringify(data);
    // return json;
  };

  const editMutation = useMutation(async (user) => await updateUser(user), {
    onSuccess: () => queryClient.invalidateQueries(["currentUser", id]),
  });

  return {
    user,
    userLoading,
    editMutation,
  };
}

export default useUserProfileQuery;
