using ManagementApp.Data.Repository;
using ManagementApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //public async Task<IActionResult> Delete(int id)
        //{
        //    try
        //    {
        //        var project = await _projectRepo.GetProject(id);
        //        if (project == null)
        //        {
        //            return NotFound($"Could not find project");
        //        }

        //        _projectRepo.Delete(oldCamp);
        //        if (await _campRepository.SaveChangesAsync())
        //        {
        //            return Ok();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }

        //    return BadRequest();
        //}
    }
}
