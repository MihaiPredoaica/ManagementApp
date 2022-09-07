import { useMutation, useQueryClient, useQuery } from "react-query";
import authService from "../../api-authorization/AuthorizeService";

function useTaskTypeQuery(id) {
  const queryClient = useQueryClient();

  const fetchTaskTypes = async () => {
    const token = await authService.getAccessToken();
    const data = await fetch(`taskType/${id}`, {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    const json = await data.json();
    return json;
  };

  const postTaskType = async (taskType) => {
    const token = await authService.getAccessToken();
    const data = await fetch("taskType", {
      method: "POST",
      body: JSON.stringify({
        name: taskType.name,
        description: taskType.description,
        icon: taskType.icon,
        projectId: id,
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

  const putTaskType = async (taskType) => {
    const token = await authService.getAccessToken();
    const data = await fetch("taskType", {
      method: "PUT",
      body: JSON.stringify({
        id: taskType.id,
        name: taskType.name,
        description: taskType.description,
        icon: taskType.icon,
        projectId: id,
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

  const deleteTaskType = async (id) => {
    const token = await authService.getAccessToken();
    const data = await fetch("taskType", {
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

  const { data: taskTypes, isLoading: taskTypesLoading } = useQuery(
    "taskTypeList",
    fetchTaskTypes,
    {
      refetchOnWindowFocus: false,
    }
  );

  const addMutation = useMutation(
    async (taskType) => await postTaskType(taskType),
    {
      onSuccess: () => queryClient.invalidateQueries("taskTypeList"),
    }
  );

  const deleteMutation = useMutation((id) => deleteTaskType(id), {
    onSuccess: () => queryClient.invalidateQueries("taskTypeList"),
  });

  const editMutation = useMutation(
    async (taskType) => await putTaskType(taskType),
    {
      onSuccess: () => queryClient.invalidateQueries("taskTypeList"),
    }
  );

  return {
    taskTypes,
    taskTypesLoading,
    addMutation,
    deleteMutation,
    editMutation,
  };
}

export default useTaskTypeQuery;
