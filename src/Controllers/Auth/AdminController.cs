using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using iconcept.Domain.Auth;
using Microsoft.AspNetCore.Authorization;
using iconcept.Domain.Auth.Pipelines.Commands;
using iconcept.Domain.Auth.Pipelines.Queries;
using MediatR;
using System.Security.Claims;

namespace iconcept.Controllers.Auth;

[ApiController]
[Authorize(Roles = "Admin")]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly UserManager<User> _userManager;

    private readonly IMediator _mediator;

    public AdminController(UserManager<User> userManager, IMediator mediator)
    {
        _userManager = userManager;
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var request = new GetUsers.Request();
        var usersWithRoles = await _mediator.Send(request);
        return Ok(usersWithRoles);
    }

    [HttpPost("{userId}/assign-role")]
    public async Task<IActionResult> AssignRole(string userId, [FromBody] string roleName)
    {
        var request = new AssignRole.Request(userId, roleName);
        var success = await _mediator.Send(request);
        
        if (success)
        {
            return Ok();
        }
        else
        {
            return BadRequest("Failed to assign role.");
        }
    }

    [HttpDelete("{userId}")]
    public async Task<IActionResult> DeleteUser(string userId)
    {
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == currentUserId)
        {
            return BadRequest("Cannot delete yourself.");
        }
        var result = await _mediator.Send(new DeleteUser.Request(userId));
        if (result)
        {
            return Ok("User deleted successfully.");
        }
        else
        {
            return NotFound("User not found or deletion failed.");
        }
    }
}
