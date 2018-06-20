using System.Threading.Tasks;
using Core.Common.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using LunchApplication.Models.Models;
using LunchApplication.Repository.Implementations;

namespace LunchApplication.Test.Unit.Repository
{
    [TestClass]
    public class LunchRepositoryTests
    {
        [TestMethod]
        public async Task GetIntValue_ReturnsSomeInt()
        {
            var config = new Mock<IConfigurationManager>();
            config.Setup(x => x.GetSetting<int>(It.IsAny<string>(), 0)).Returns(12);

            var repo = new LunchRepository(config.Object);
            var result = await repo.GetIntValueAsync();
            Assert.IsInstanceOfType(result, typeof(int));
            Assert.AreEqual(result, 12);
        }

        [TestMethod]
        public async Task GetValueAsync_ReturnsSomeValue()
        {
            var config = new Mock<IConfigurationManager>();
            config.Setup(x => x.GetSetting(It.IsAny<string>())).Returns("some value");

            var repo = new LunchRepository(config.Object);
            var result = await repo.GetValueAsync(1);
            Assert.AreEqual(result, "some value");
        }

        [TestMethod]
        public async Task AddLunchAsync_DoesNotThrow()
        {
            var config = new Mock<IConfigurationManager>();
            var repo = new LunchRepository(config.Object);
            var request = new LunchDto();
            //var response = await repo.AddLunchAsync(request);
            //Assert.AreEqual(request.SomeRequiredValue, response.SomeRequiredValue);
        }
    }
}
