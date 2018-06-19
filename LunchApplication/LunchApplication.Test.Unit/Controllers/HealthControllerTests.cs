using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Hosting;
using Chipotle.Core.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using LunchApplication.Api.Controllers;

namespace LunchApplication.Test.Unit.Controllers
{
    [TestClass]
    public class HealthControllerTests
    {
        private HealthController _healthController;
        private Mock<IObjectLogger> _logger;
        [TestInitialize]
        public void SetupTest()
        {
            _logger = new Mock<IObjectLogger>();
            _logger.Setup(x => x.IsDebugEnabled).Returns(true);

            _healthController = new HealthController(_logger.Object)
            {
                Request = new HttpRequestMessage()
                {
                    //This needs to be set, otherwise we'll get an excption -"HttpControllerContext.Configuration must not be null"
                    Properties = { { HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration() } }
                }
            };
        }

        [TestMethod]
        public async Task Get_Success()
        {

            var response = await _healthController.Get();

            Assert.IsNotNull(response);
            Assert.IsInstanceOfType(response, typeof(HttpResponseMessage));
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [TestMethod]
        public async Task Post_Success()
        {

            var response = await _healthController.Post("state");

            Assert.IsNotNull(response);
            Assert.IsInstanceOfType(response, typeof(HttpResponseMessage));
        }
    }
}