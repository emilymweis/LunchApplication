using System.Threading.Tasks;
using Chipotle.Core.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using LunchApplication.Repository.Interfaces;
using LunchApplication.Service.Implementations;

namespace LunchApplication.Test.Unit.Service
{
    [TestClass]
    public class SampleServiceTests
    {
        [TestMethod]
        public async Task GetIntValueAsync_CallsRepo()
        {
            var repo = new Mock<ISampleRepository>();
            var logger = new Mock<IObjectLogger>();
            repo.Setup(x => x.GetIntValueAsync()).Returns(Task.FromResult(12));

            var service = new SampleService(repo.Object, logger.Object);
            var result = await service.GetIntValueAsync();

            repo.Verify(x => x.GetIntValueAsync(), Times.Exactly(1));
            Assert.IsInstanceOfType(result, typeof(int));
            Assert.AreEqual(result, 12);

        }

        [TestMethod]
        public async Task GetValueAsync_CallsRepo()
        {
            var repo = new Mock<ISampleRepository>();
            var logger = new Mock<IObjectLogger>();
            repo.Setup(x => x.GetValueAsync(It.IsAny<int>())).Returns(Task.FromResult("some value"));

            var service = new SampleService(repo.Object, logger.Object);
            var result = await service.GetValueAsync(1);

            repo.Verify(x => x.GetValueAsync(It.IsAny<int>()), Times.Exactly(1));
            Assert.AreEqual(result, "some value");
        }
    }
}
