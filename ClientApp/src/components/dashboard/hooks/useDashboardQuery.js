import { useQuery } from "react-query";
import authService from "../../api-authorization/AuthorizeService";

function useDashboardQuery(id) {
  const fetchProject = async (id) => {
    const token = await authService.getAccessToken();
    const data = await fetch(`project/${id}`, {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    const json = await data.json();
    return json;
  };

  const { data: project, isLoading: projectLoading } = useQuery(
    ["selectedProject", id],
    () => fetchProject(id),
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    project,
    projectLoading,
  };
}

export default useDashboardQuery;
