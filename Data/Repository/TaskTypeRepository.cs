using ManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementApp.Data.Repository
{
    public class TaskTypeRepository: ITaskTypeRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public TaskTypeRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Add(TaskType taskType)
        {
            _dbContext.Add(taskType);
            _dbContext.SaveChanges();
        }

        public void Delete(TaskType taskType)
        {
            _dbContext.TaskTypes.Remove(taskType);
            _dbContext.SaveChanges();
        }

        public IList<TaskType> GetTaskTypes()
        {
            return _dbContext.TaskTypes.ToList();
        }

        public TaskType GetTaskType(int id)
        {
            return _dbContext.TaskTypes.FirstOrDefault(x => x.Id == id);
        }

        public TaskType Update(TaskType taskTypeChanges)
        {
            var taskType = _dbContext.TaskTypes.Attach(taskTypeChanges);
            taskType.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _dbContext.SaveChanges();
            return taskTypeChanges;
        }
    }
}
