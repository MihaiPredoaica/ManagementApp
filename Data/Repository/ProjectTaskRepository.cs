using ManagementApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementApp.Data.Repository
{
    public class ProjectTaskRepository: IProjectTaskRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public ProjectTaskRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(ProjectTask projectTask)
        {
            await _dbContext.AddAsync(projectTask);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(ProjectTask projectTask)
        {
            _dbContext.ProjectTasks.Remove(projectTask);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IList<ProjectTask>> GetProjectTasksAsync()
        {
            return await _dbContext.ProjectTasks.ToListAsync();
        }

        public async Task<ProjectTask> GetProjectTaskAsync(int id)
        {
            return await _dbContext.ProjectTasks.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<ProjectTask> UpdateAsync(ProjectTask projectTaskChanges)
        {
            var projectTask = _dbContext.ProjectTasks.Attach(projectTaskChanges);
            projectTask.State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return projectTaskChanges;
        }
    }
}
