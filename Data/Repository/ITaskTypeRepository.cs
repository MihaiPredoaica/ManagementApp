using ManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementApp.Data.Repository
{
    public interface ITaskTypeRepository
    {
        Task<IList<TaskType>> GetTaskTypesAsync(int projectId);
        Task<TaskType> GetTaskTypeAsync(int taskTypeId);
        Task AddAsync(TaskType taskType);
        Task<TaskType> UpdateAsync(TaskType taskType);
        Task DeleteAsync(TaskType taskType);
    }
}
