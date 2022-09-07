import { useMutation, useQueryClient, useQuery } from "react-query";
import authService from "../../api-authorization/AuthorizeService";

function useProjectTaskQuery(id) {
  const queryClient = useQueryClient();

  const fetchProjectTasks = async () => {
    const token = await authService.getAccessToken();
    const data = await fetch(`projectTask/${id}`, {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    const json = await data.json();
    return json;
  };

  const postProjectTask = async (projectTask) => {
    const token = await authService.getAccessToken();
    console.log(projectTask);
    const data = await fetch("projectTask", {
      method: "POST",
      body: JSON.stringify({
        name: projectTask.name,
        description: projectTask.description,
        icon: projectTask.icon,
        typeId: projectTask.typeId,
        projectId: projectTask.projectId,
        parentTaskId: projectTask.parentTaskId,
        layer: projectTask.layer,
        estimation: projectTask.estimation,
        stage: projectTask.stage,
        logged: projectTask.logged,
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

  const putProjectTask = async (projectTask) => {
    const token = await authService.getAccessToken();
    const data = await fetch("projectTask", {
      method: "PUT",
      body: JSON.stringify({
        id: projectTask.id,
        name: projectTask.name,
        description: projectTask.description,
        icon: projectTask.icon,
        typeId: projectTask.typeId,
        projectId: projectTask.projectId,
        parentTaskId: projectTask.parentTaskId,
        layer: projectTask.layer,
        estimation: projectTask.estimation,
        stage: projectTask.stage,
        logged: projectTask.logged ?? 0,
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

  const deleteProjectTask = async (id) => {
    const token = await authService.getAccessToken();
    const data = await fetch("projectTask", {
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

  const { data: projectTasks, isLoading: projectTasksLoading } = useQuery(
    "projectTaskList",
    fetchProjectTasks,
    {
      refetchOnWindowFocus: false,
    }
  );

  const addMutation = useMutation(
    async (projectTask) => await postProjectTask(projectTask),
    {
      onSuccess: () => queryClient.invalidateQueries("projectTaskList"),
    }
  );

  const deleteMutation = useMutation((id) => deleteProjectTask(id), {
    onSuccess: () => queryClient.invalidateQueries("projectTaskList"),
  });

  const editMutation = useMutation(
    async (projectTask) => await putProjectTask(projectTask),
    {}
  );

  return {
    projectTasks,
    projectTasksLoading,
    addMutation,
    deleteMutation,
    editMutation,
  };
}

export default useProjectTaskQuery;
