import { useMutation, useQueryClient, useQuery } from "react-query";
import authService from "../../api-authorization/AuthorizeService";

function useProjectQuery() {
  const queryClient = useQueryClient();

  const fetchProjects = async () => {
    const token = await authService.getAccessToken();
    const data = await fetch("project", {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    const json = await data.json();
    return json;
  };

  const postProject = async (project) => {
    const token = await authService.getAccessToken();
    const user = await authService.getUser();
    const data = await fetch("project", {
      method: "POST",
      body: JSON.stringify({
        name: project.name,
        description: project.description,
        icon: project.icon,
        ownerId: user.sub,
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

  const deleteProject = async (id) => {
    const token = await authService.getAccessToken();
    const data = await fetch("project", {
      method: "DELETE",
      body: JSON.stringify({
        id,
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

  const { data } = useQuery("projectList", fetchProjects, {
    refetchOnWindowFocus: false,
  });

  const addMutation = useMutation(
    async (project) => await postProject(project),
    {
      onSuccess: () => queryClient.invalidateQueries("projectList"),
    }
  );

  const deleteMutation = useMutation((id) => deleteProject(id), {
    onSuccess: () => queryClient.invalidateQueries("projectList"),
  });

  const editMutation = useMutation(
    async (project) => await putProject(project),
    {
      onSuccess: () => queryClient.invalidateQueries("projectList"),
    }
  );

  return {
    data,
    addMutation,
    deleteMutation,
    editMutation,
  };
}

export default useProjectQuery;
