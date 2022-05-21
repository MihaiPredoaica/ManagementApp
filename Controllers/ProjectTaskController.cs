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

        public ProjectTaskController(IProjectTaskRepository projectTaskRepo)
        {
            _projectTaskRepo = projectTaskRepo;
        }

        [HttpGet]
        public async Task<IEnumerable<ProjectTask>> Get()
        {
            return await _projectTaskRepo.GetProjectTasksAsync();
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
                var project = await _projectTaskRepo.GetProjectTaskAsync(model.Id);
                await _projectTaskRepo.DeleteAsync(project);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
