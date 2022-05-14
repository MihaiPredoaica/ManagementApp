using ManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementApp.Data.Repository
{
    public interface IProjectUserRepository
    {
        IList<ProjectUser> GetProjectUsers();
        ProjectUser GetProjectUser(int projectUserId);
        void Add(ProjectUser projectUser);
        ProjectUser Update(ProjectUser projectUser);
        void Delete(ProjectUser projectUser);
    }
}
