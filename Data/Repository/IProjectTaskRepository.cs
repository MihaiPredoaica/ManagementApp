using ManagementApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ManagementApp.Data.Repository
{
    public interface IProjectTaskRepository
    {
        Task<IList<ProjectTask>> GetProjectTasksAsync();
        Task<ProjectTask> GetProjectTaskAsync(int projectTaskId);
        Task AddAsync(ProjectTask projectTask);
        Task<ProjectTask> UpdateAsync(ProjectTask projectTask);
        Task DeleteAsync(ProjectTask projectTask);
    }
}
