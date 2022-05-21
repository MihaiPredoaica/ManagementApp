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
    public class ProjectUserController : ControllerBase
    {
        private readonly IProjectUserRepository _projectUserRepo;

        public ProjectUserController(IProjectUserRepository projectUserRepo)
        {
            _projectUserRepo = projectUserRepo;
        }

        [HttpGet]
        public async Task<IEnumerable<ProjectUser>> Get()
        {
            return await _projectUserRepo.GetProjectUsersAsync();
        }


        [HttpPost]
        public async Task<ActionResult<ProjectUser>> Post(ProjectUser model)
        {
            try
            {
                await _projectUserRepo.AddAsync(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<ProjectUser>> Put(ProjectUser model)
        {
            try
            {
                await _projectUserRepo.UpdateAsync(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(ProjectUser model)
        {
            try
            {
                var project = await _projectUserRepo.GetProjectUserAsync(model.Id);
                await _projectUserRepo.DeleteAsync(project);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
