using ManagementApp.Data.Repository;
using ManagementApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepo;
        private readonly IProjectUserRepository _projectUserRepo;
        private readonly ITaskTypeRepository _taskTypeRepo;
        private readonly IProjectTaskRepository _projectTaskRepo;
        private readonly UserManager<ApplicationUser> _userManager;

        public ProjectController(IProjectRepository projectRepo, IProjectUserRepository projectUserRepo, IProjectTaskRepository projectTaskRepo, ITaskTypeRepository taskTypeRepo, UserManager<ApplicationUser> userManager)
        {
            _projectRepo = projectRepo;
            _projectUserRepo = projectUserRepo;
            _userManager = userManager;
            _taskTypeRepo = taskTypeRepo;
            _projectTaskRepo = projectTaskRepo;
        }

        [HttpGet]
        public async Task<IEnumerable<Project>> Get()
        {
            var projects =  await _projectRepo.GetProjectsAsync();
            
            foreach(var project in projects)
            {
                var projectUsers = (await _projectUserRepo.GetProjectUsersAsync()).Where(pu => pu.ProjectId == project.Id).Select(pu => pu.UserId);
                project.SelectedUsers = _userManager.Users?.ToList().Where(user => projectUsers.Contains(user.Id));
            }

            return projects;
        }

        [HttpGet("{id}")]
        public async Task<Project> GetProjectById(int id)
        {
            var project = await _projectRepo.GetProjectAsync(id);

            var projectUsers = (await _projectUserRepo.GetProjectUsersAsync()).Where(pu => pu.ProjectId == project.Id).Select(pu => pu.UserId);
            project.SelectedUsers = _userManager.Users?.ToList().Where(user => projectUsers.Contains(user.Id));

            return project;
        }


        [HttpPost]
        public async Task<ActionResult<Project>> Post(Project model)
        {
            try
            {
                await _projectRepo.AddAsync(model);
                foreach(var user in model.SelectedUsers)
                {
                    await _projectUserRepo.AddAsync(new ProjectUser { ProjectId = model.Id, UserId = user.Id });
                }
                var taskType = new TaskType { Name = "Root Task Type", Description = "This is the task type for the root task", Icon = 16, ProjectId = model.Id };
                await _taskTypeRepo.AddAsync(taskType);

                var projectTask = new ProjectTask { Name = "Root Task", Description = "This is the root task for the project", TypeId = taskType.Id, ProjectId = model.Id, Layer = 0, ParentTaskId = -1, Icon=16 };
                await _projectTaskRepo.AddAsync(projectTask);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<Project>> Put(Project model)
        {
            try
            {
                await _projectRepo.UpdateAsync(model);
                var projectUsers = (await _projectUserRepo.GetProjectUsersAsync()).Where(p => p.ProjectId == model.Id);

                foreach(var pu in projectUsers)
                {
                    await _projectUserRepo.DeleteAsync(pu);
                }

                if(model.SelectedUsers != null)
                {
                    foreach (var user in model.SelectedUsers)
                    {
                        await _projectUserRepo.AddAsync(new ProjectUser { ProjectId = model.Id, UserId = user.Id });
                    }
                }


                return Ok();   
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Project model)
        {
            try
            {
                var projectUsers = (await _projectUserRepo.GetProjectUsersAsync()).Where(p => p.ProjectId == model.Id);

                foreach (var pu in projectUsers)
                {
                    await _projectUserRepo.DeleteAsync(pu);
                }

                foreach(var projectTask in (await _projectTaskRepo.GetProjectTasksAsync(model.Id)))
                {
                    await _projectTaskRepo.DeleteAsync(projectTask);
                }

                foreach (var taskType in (await _taskTypeRepo.GetTaskTypesAsync(model.Id)))
                {
                    await _taskTypeRepo.DeleteAsync(taskType);
                }

                var project = await _projectRepo.GetProjectAsync(model.Id);
                await _projectRepo.DeleteAsync(project);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
