using ManagementApp.Data.Repository;
using ManagementApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TaskTypeController : ControllerBase
    {
        private readonly ITaskTypeRepository _taskTypeRepo;
        private readonly IProjectRepository _projectRepo;
        private readonly IProjectTaskRepository _projectTaskRepo;

        public TaskTypeController(ITaskTypeRepository taskTypeRepo, IProjectRepository projectRepo, IProjectTaskRepository projectTaskRepo)
        {
            _taskTypeRepo = taskTypeRepo;
            _projectRepo = projectRepo;
            _projectTaskRepo = projectTaskRepo;
        }

        [HttpGet("{id}")]
        public async Task<IEnumerable<TaskType>> GetByProjectId(int id)
        {
            try
            {
                return await _taskTypeRepo.GetTaskTypesAsync(id);
            }
            catch(Exception ex)
            {
                return (IEnumerable<TaskType>)StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        public async Task<ActionResult<TaskType>> Post(TaskType model)
        {
            try
            {
                model.Project = await _projectRepo.GetProjectAsync(model.ProjectId);
                await _taskTypeRepo.AddAsync(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<TaskType>> Put(TaskType model)
        {
            try
            {
                await _taskTypeRepo.UpdateAsync(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(TaskType model)
        {
            try
            {
                foreach (var projectTask in (await _projectTaskRepo.GetProjectTasksAsync(model.ProjectId)).Where(x => x.TypeId == model.Id))
                {
                    await _projectTaskRepo.DeleteAsync(projectTask);
                }

                var project = await _taskTypeRepo.GetTaskTypeAsync(model.Id);
                await _taskTypeRepo.DeleteAsync(project);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
