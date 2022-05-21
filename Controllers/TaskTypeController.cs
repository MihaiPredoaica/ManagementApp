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

        public TaskTypeController(ITaskTypeRepository taskTypeRepo)
        {
            _taskTypeRepo = taskTypeRepo;
        }

        [HttpGet]
        public async Task<IEnumerable<TaskType>> Get()
        {
            return await _taskTypeRepo.GetTaskTypesAsync();
        }


        [HttpPost]
        public async Task<ActionResult<TaskType>> Post(TaskType model)
        {
            try
            {
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
