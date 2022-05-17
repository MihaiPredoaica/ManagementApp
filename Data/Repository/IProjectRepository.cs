using ManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementApp.Data.Repository
{
    public interface IProjectRepository
    {
        Task<IList<Project>> GetProjectsAsync();
        Task<Project> GetProjectAsync(int projectId);
        Task AddAsync(Project project);
        Task<Project> UpdateAsync(Project project);
        Task DeleteAsync(Project project);
    }
}
