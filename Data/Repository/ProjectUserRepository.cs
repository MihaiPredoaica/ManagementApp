using ManagementApp.Models;
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

        public void Add(ProjectUser projectUser)
        {
            _dbContext.Add(projectUser);
            _dbContext.SaveChanges();
        }

        public void Delete(ProjectUser projectUser)
        {
            _dbContext.ProjectUsers.Remove(projectUser);
            _dbContext.SaveChanges();
        }

        public IList<ProjectUser> GetProjectUsers()
        {
            return _dbContext.ProjectUsers.ToList();
        }

        public ProjectUser GetProjectUser(int id)
        {
            return _dbContext.ProjectUsers.FirstOrDefault(x => x.Id == id);
        }

        public ProjectUser Update(ProjectUser projectUserChanges)
        {
            var projectUser = _dbContext.ProjectUsers.Attach(projectUserChanges);
            projectUser.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _dbContext.SaveChanges();
            return projectUserChanges;
        }
    }
}
