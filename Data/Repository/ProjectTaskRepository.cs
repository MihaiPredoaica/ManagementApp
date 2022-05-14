using ManagementApp.Models;
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

        public void Add(ProjectTask projectTask)
        {
            _dbContext.Add(projectTask);
            _dbContext.SaveChanges();
        }

        public void Delete(ProjectTask projectTask)
        {
            _dbContext.ProjectTasks.Remove(projectTask);
            _dbContext.SaveChanges();
        }

        public IList<ProjectTask> GetProjectTasks()
        {
            return _dbContext.ProjectTasks.ToList();
        }

        public ProjectTask GetProjectTask(int id)
        {
            return _dbContext.ProjectTasks.FirstOrDefault(x => x.Id == id);
        }

        public ProjectTask Update(ProjectTask projectTaskChanges)
        {
            var projectTask = _dbContext.ProjectTasks.Attach(projectTaskChanges);
            projectTask.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _dbContext.SaveChanges();
            return projectTaskChanges;
        }
    }
}
