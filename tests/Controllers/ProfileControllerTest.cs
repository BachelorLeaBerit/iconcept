using System;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using iconcept.Controllers.Auth;
using iconcept.Domain.Auth.Pipelines.Commands;
using iconcept.Domain.Auth.Pipelines.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace iconcept.Tests.Controllers.Auth
{
    public class UserProfileControllerTests
    {
        [Fact]
        public async Task GetUserProfile_Returns_OkResult()
        {
            var mediatorMock = new Mock<IMediator>();
            var controller = new UserProfileController(mediatorMock.Object);

            var userClaims = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, "testUserGuid"),
                new Claim(ClaimTypes.Name, "testUserName")
            }));

            var httpContext = new DefaultHttpContext();
            httpContext.User = userClaims;
            controller.ControllerContext = new ControllerContext { HttpContext = httpContext };

            var getUserProfileResponse = new OkObjectResult("User profile data");
            mediatorMock.Setup(m => m.Send(It.IsAny<GetUserProfile.Request>(), default))
                .ReturnsAsync(getUserProfileResponse);

            var result = await controller.GetUserProfile();

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task DeleteUser_Returns_OkResult()
        {
            var mediatorMock = new Mock<IMediator>();
            var controller = new UserProfileController(mediatorMock.Object);

            var userId = "testUserGuid";
            var deleteUserResponse = true;
            mediatorMock.Setup(m => m.Send(It.IsAny<DeleteUser.Request>(), default))
                .ReturnsAsync(deleteUserResponse);

            var result = await controller.DeleteUser(userId);

            Assert.IsType<OkResult>(result);
        }
    }
}
