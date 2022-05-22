using ManagementApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementApp.Data.Repository
{
    public class ProjectRepository: IProjectRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public ProjectRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(Project project)
        {
            await _dbContext.AddAsync(project);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Project project)
        {
            _dbContext.Project.Remove(project);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IList<Project>> GetProjectsAsync()
        {
            return await _dbContext.Project.Include(x => x.Users).ToListAsync();
        }

        public async Task<Project> GetProjectAsync(int id)
        {
            return await _dbContext.Project.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Project> UpdateAsync(Project projectChanges)
        {
            var project = _dbContext.Project.Attach(projectChanges);
            project.State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return projectChanges;
        }
    }
}
