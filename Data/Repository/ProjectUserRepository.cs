using ManagementApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementApp.Data.Repository
{
    public class ProjectUserRepository: IProjectUserRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public ProjectUserRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(ProjectUser projectUser)
        {
            await _dbContext.AddAsync(projectUser);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(ProjectUser projectUser)
        {
            _dbContext.ProjectUsers.Remove(projectUser);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IList<ProjectUser>> GetProjectUsersAsync()
        {
            return await _dbContext.ProjectUsers.ToListAsync();
        }

        public async Task<ProjectUser> GetProjectUserAsync(int id)
        {
            return await _dbContext.ProjectUsers.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<ProjectUser> UpdateAsync(ProjectUser projectUserChanges)
        {
            var projectUser = _dbContext.ProjectUsers.Attach(projectUserChanges);
            projectUser.State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return projectUserChanges;
        }
    }
}
