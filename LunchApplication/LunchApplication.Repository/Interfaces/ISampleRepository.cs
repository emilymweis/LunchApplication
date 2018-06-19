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
    public interface ISampleRepository : IRepository
    {
        Task<string> GetValueAsync(int validId);
        Task<SampleDto> AddSampleAsync(SampleDto sample);
        Task<int> GetIntValueAsync();
    }
}
