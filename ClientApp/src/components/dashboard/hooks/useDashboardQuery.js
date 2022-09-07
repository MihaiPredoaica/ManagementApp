import { useMutation, useQueryClient, useQuery } from "react-query";
import authService from "../../api-authorization/AuthorizeService";

function useDashboardQuery(id) {
  const queryClient = useQueryClient();

  const fetchProject = async (id) => {
    const token = await authService.getAccessToken();
    const data = await fetch(`project/${id}`, {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    const json = await data.json();
    return json;
  };

  const putProject = async (project) => {
    const token = await authService.getAccessToken();
    const user = await authService.getUser();
    const data = await fetch("project", {
      method: "PUT",
      body: JSON.stringify({
        id: project.id,
        name: project.name,
        description: project.description,
        icon: project.icon,
        ownerId: user.sub,
        selectedUsers: project.selectedUsers,
      }),
      headers: !token
        ? {}
        : {
            Authorization: `Bearer ${token}`,
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
          },
    });
    const json = JSON.stringify(data);
    return json;
  };

  const { data: project, isLoading: projectLoading } = useQuery(
    "selectedProject",
    () => fetchProject(id),
    {
      refetchOnWindowFocus: false,
    }
  );

  const onSuccess = async () => {
    await queryClient.invalidateQueries("selectedProject");
  };

  const editMutation = useMutation(
    async (project) => await putProject(project),
    {
      onSuccess,
    }
  );

  return {
    project,
    projectLoading,
    editMutation,
  };
}

export default useDashboardQuery;
