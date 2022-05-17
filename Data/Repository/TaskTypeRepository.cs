using ManagementApp.Models;
using Microsoft.EntityFrameworkCore;
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

        public async Task AddAsync(TaskType taskType)
        {
            await _dbContext.AddAsync(taskType);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(TaskType taskType)
        {
            _dbContext.TaskTypes.Remove(taskType);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IList<TaskType>> GetTaskTypesAsync()
        {
            return await _dbContext.TaskTypes.ToListAsync();
        }

        public async Task<TaskType> GetTaskTypeAsync(int id)
        {
            return await _dbContext.TaskTypes.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<TaskType> UpdateAsync(TaskType taskTypeChanges)
        {
            var taskType = _dbContext.TaskTypes.Attach(taskTypeChanges);
            taskType.State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return taskTypeChanges;
        }
    }
}
