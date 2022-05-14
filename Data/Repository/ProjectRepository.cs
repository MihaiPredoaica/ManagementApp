using ManagementApp.Models;
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

        public void Add(Project project)
        {
            _dbContext.Add(project);
            _dbContext.SaveChanges();
        }

        public void Delete(Project project)
        {
            _dbContext.Project.Remove(project);
            _dbContext.SaveChanges();
        }

        public IList<Project> GetProjects()
        {
            return _dbContext.Project.ToList();
        }

        public Project GetProject(int id)
        {
            return _dbContext.Project.FirstOrDefault(x => x.Id == id);
        }

        public Project Update(Project projectChanges)
        {
            var project = _dbContext.Project.Attach(projectChanges);
            project.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _dbContext.SaveChanges();
            return projectChanges;
        }
    }
}
