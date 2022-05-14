using ManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementApp.Data.Repository
{
    public interface IProjectRepository
    {
        IList<Project> GetProjects();
        Project GetProject(int projectId);
        void Add(Project project);
        Project Update(Project project);
        void Delete(Project project);
    }
}
