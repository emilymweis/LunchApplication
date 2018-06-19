using System.Threading.Tasks;
using Core.Common.Interfaces;
using LunchApplication.Models.Models;

namespace LunchApplication.Service.Interfaces
{
    /// <summary>
    /// This interface demonstrates a sample service interface.  Because it also includes IService, any implementations
    /// of the ISampleService interface will automatically be registered with dependency injection.
    /// </summary>
    public interface ILunchService : IService
    {
        Task<string> GetValueAsync(string validId);
        Task<LunchDto> AddLunchAsync(LunchDto lunch);
        Task<int> GetIntValueAsync();
    }
}