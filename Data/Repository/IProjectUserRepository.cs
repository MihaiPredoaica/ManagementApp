using ManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementApp.Data.Repository
{
    public interface IProjectUserRepository
    {
        Task<IList<ProjectUser>> GetProjectUsersAsync();
        Task<ProjectUser> GetProjectUserAsync(int projectUserId);
        Task AddAsync(ProjectUser projectUser);
        Task<ProjectUser> UpdateAsync(ProjectUser projectUser);
        Task DeleteAsync(ProjectUser projectUser);
    }
}
