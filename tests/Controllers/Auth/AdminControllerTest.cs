using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using iconcept.Domain.Auth;
using iconcept.Controllers.Auth;
using iconcept.Domain.Auth.Pipelines.Commands;
using iconcept.Domain.Auth.Pipelines.Queries;
using MediatR;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace iconcept.tests.Controllers
{
    public class AdminControllerTests
    {
        [Fact]
        public async Task GetUsers_ReturnsOkResult()
        {
            var mediatorMock = new Mock<IMediator>();
            var controller = new AdminController(null, mediatorMock.Object);

            var result = await controller.GetUsers();

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task AssignRole_ReturnsOkResult_WhenSuccessful()
        {
            var mediatorMock = new Mock<IMediator>();
            mediatorMock.Setup(m => m.Send(It.IsAny<AssignRole.Request>(), default))
                        .ReturnsAsync(true);
            var controller = new AdminController(null, mediatorMock.Object);

            var result = await controller.AssignRole("userId", "roleName");

            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task AssignRole_ReturnsBadRequestResult_WhenUnsuccessful()
        {
            var mediatorMock = new Mock<IMediator>();
            mediatorMock.Setup(m => m.Send(It.IsAny<AssignRole.Request>(), default))
                        .ReturnsAsync(false);
            var controller = new AdminController(null, mediatorMock.Object);

            var result = await controller.AssignRole("userId", "roleName");

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task DeleteUser_ReturnsBadRequestResult_WhenCurrentAdminUserIsDeleted()
        {
            // Arrange
            var mediatorMock = new Mock<IMediator>();
            var controller = new AdminController(null, mediatorMock.Object);

            var httpContext = new DefaultHttpContext();
            httpContext.User = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
            new Claim(ClaimTypes.NameIdentifier, "userId")
            }));
            controller.ControllerContext = new ControllerContext { HttpContext = httpContext };

            var result = await controller.DeleteUser("userId");

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task DeleteUser_ReturnsNotFoundResult_WhenUnsuccessful()
        {
            var mediatorMock = new Mock<IMediator>();
            mediatorMock.Setup(m => m.Send(It.IsAny<DeleteUser.Request>(), default))
                        .ReturnsAsync(false);
            var controller = new AdminController(null, mediatorMock.Object);

            var httpContext = new DefaultHttpContext();
            httpContext.User = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
            new Claim(ClaimTypes.NameIdentifier, "someUserId")
            }));
            controller.ControllerContext = new ControllerContext { HttpContext = httpContext };

            var result = await controller.DeleteUser("userId");

            Assert.IsType<NotFoundObjectResult>(result);
        }

    }
}
