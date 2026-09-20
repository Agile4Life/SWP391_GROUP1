using Microsoft.AspNetCore.Mvc;

namespace BackendApi.Controllers 
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetHealth()
        {
            
            return Ok("UP");
        }
    }
}