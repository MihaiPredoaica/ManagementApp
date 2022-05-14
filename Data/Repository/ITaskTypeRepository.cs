using ManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementApp.Data.Repository
{
    public interface ITaskTypeRepository
    {
        IList<TaskType> GetTaskTypes();
        TaskType GetTaskType(int taskTypeId);
        void Add(TaskType taskType);
        TaskType Update(TaskType taskType);
        void Delete(TaskType taskType);
    }
}
