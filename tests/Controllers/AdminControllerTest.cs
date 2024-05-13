using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using iconcept.Domain.Auth;
using iconcept.Controllers.Auth;
using iconcept.Domain.Auth.Pipelines.Commands;
using iconcept.Domain.Auth.Pipelines.Queries;
using MediatR;
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


    }
}
