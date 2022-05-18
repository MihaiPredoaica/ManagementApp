using ManagementApp.Data.Repository;
using ManagementApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ManagementApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepo;

        public ProjectController(IProjectRepository projectRepo)
        {
            _projectRepo = projectRepo;
        }

        [HttpGet]
        public async Task<IEnumerable<Project>> Get()
        {
            return await _projectRepo.GetProjectsAsync();
        }


        [HttpPost]
        public async Task<ActionResult<Project>> Post(Project model)
        {
            try
            {
                await _projectRepo.AddAsync(model);
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
