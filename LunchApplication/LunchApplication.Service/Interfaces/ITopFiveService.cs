using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Common.Interfaces;
using LunchApplication.Models.Models;

namespace LunchApplication.Service.Interfaces
{
    /// <summary>
    /// This interface demonstrates a sample service interface.  Because it also includes IService, any implementations
    /// of the ISampleService interface will automatically be registered with dependency injection.
    /// </summary>
    public interface ITopFiveService : IService
    {
        Task<string> GetValueAsync(string validId);
        Task<TopFiveOptions> AddTopFiveAsync(TopFiveOptions TopFive);
        Task<int> GetIntValueAsync();
        List<TopFiveOptions> Test();
        Task<string> SaveTopFive(int userId, string restaurantOne, string restaurantTwo, string restaurantThree, string restaurantFour, string restaurantFive);
    }
}