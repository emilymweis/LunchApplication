using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Common.Interfaces;
using LunchApplication.Models.Models;

namespace LunchApplication.Repository.Interfaces
{
    /// <summary>
    /// This interface demonstrates a sample repository interface.  Because it also includes 
    /// IRepository, any implementations of the ISampleRepository interface will automatically 
    /// be registered with dependency injection.
    /// </summary>
    public interface ITopFiveRepository : IRepository
    {
        Task<string> GetValueAsync(int validId);
        Task<TopFiveOptions> AddTopFiveAsync(TopFiveOptions TopFive);
        Task<int> GetIntValueAsync();
        List<TopFiveOptions> Test();
    }
}
