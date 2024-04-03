using Application.Commands;
using Application.Handlers;
using Application.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
 

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new GetActiviesListQuery());
            
        }

        
        [HttpGet("{Id}")]
        public async Task<ActionResult<Activity>> GetActivitiy(Guid Id)
        {
            return await Mediator.Send(new GetActivityByDetailQuery{Id = Id} );
        }
        
                
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
        {
              await Mediator.Send(new CreateActivityCommand{Activity = activity} );
              return Ok();
        }

                        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(Guid id, Activity activity)
        {
            activity.Id = id;
             await Mediator.Send(new EditActivityCommand{Activity = activity} );
              return Ok();
        }
                                
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
     
             await Mediator.Send(new DeleteActivityCommand{ActivityId = id} );
              return Ok();
        }
        
    }
}