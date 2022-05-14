using ManagementApp.Models;
using System.Collections.Generic;

namespace ManagementApp.Data.Repository
{
    public interface IProjectTaskRepository
    {
        IList<ProjectTask> GetProjectTasks();
        ProjectTask GetProjectTask(int projectTaskId);
        void Add(ProjectTask projectTask);
        ProjectTask Update(ProjectTask projectTask);
        void Delete(ProjectTask projectTask);
    }
}
