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
            _dbContext.TaskType.Remove(taskType);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IList<TaskType>> GetTaskTypesAsync(int projectId)
        {
            return await _dbContext.TaskType.Where(x => x.ProjectId == projectId).ToListAsync();
        }

        public async Task<TaskType> GetTaskTypeAsync(int id)
        {
            return await _dbContext.TaskType.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<TaskType> UpdateAsync(TaskType taskTypeChanges)
        {
            var taskType = _dbContext.TaskType.Attach(taskTypeChanges);
            taskType.State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return taskTypeChanges;
        }
    }
}
