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
    public class ProjectTaskController : ControllerBase
    {
        private readonly IProjectTaskRepository _projectTaskRepo;
        private readonly ITaskTypeRepository _taskTypeRepo;
        private readonly IProjectRepository _projectRepo;

        public ProjectTaskController(IProjectTaskRepository projectTaskRepo, ITaskTypeRepository taskTypeRepo, IProjectRepository projectRepo)
        {
            _projectTaskRepo = projectTaskRepo;
            _taskTypeRepo = taskTypeRepo;
            _projectRepo = projectRepo;
        }

        [HttpGet("{id}")]
        public async Task<IEnumerable<ProjectTask>> GetByProjectId(int id)
        {
            try
            {
                var tasks = await _projectTaskRepo.GetProjectTasksAsync(id);
                foreach(var task in tasks)
                {
                    task.Type = await _taskTypeRepo.GetTaskTypeAsync(task.TypeId);
                    task.Project = await _projectRepo.GetProjectAsync(task.ProjectId);
                }

                return tasks;
            }
            catch (Exception ex)
            {
                return (IEnumerable<ProjectTask>)StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        public async Task<ActionResult<ProjectTask>> Post(ProjectTask model)
        {
            try
            {
                await _projectTaskRepo.AddAsync(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<ProjectTask>> Put(ProjectTask model)
        {
            try
            {
                await _projectTaskRepo.UpdateAsync(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(ProjectTask model)
        {
            try
            {
                var projectTask = await _projectTaskRepo.GetProjectTaskAsync(model.Id);
                var relatedTasks = (await _projectTaskRepo.GetProjectTasksAsync(model.ProjectId)).Where(task => task.ParentTaskId == model.Id);
                if(relatedTasks.Count() > 0)
                {
                    foreach(var relatedTask in relatedTasks)
                    {
                        await Delete(relatedTask);
                    }
                }
                await _projectTaskRepo.DeleteAsync(projectTask);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
