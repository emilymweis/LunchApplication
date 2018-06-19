using System.Threading.Tasks;
using Chipotle.Core.Logging;
using LunchApplication.Models.Models;
using LunchApplication.Repository.Interfaces;
using LunchApplication.Service.Interfaces;

namespace LunchApplication.Service.Implementations
{
    /// <summary>
    /// This class illustrates an example service implementation.  Because ISampleService also includes
    /// the IService interface, it is automatically registered with dependency injection.
    /// </summary>
    public class LunchService : ILunchService

    {
        private readonly ILunchRepository _lunchRepository;
        private readonly IObjectLogger _logger;

        public LunchService(ILunchRepository lunchRepository, IObjectLogger logger)
        {
            _lunchRepository = lunchRepository;
            _logger = logger;
        }

        public async Task<int> GetIntValueAsync()
        {
            if (_logger.IsDebugEnabled)
            {
                _logger.Debug("Calling Lunch get int from service");
            }
            return await _lunchRepository.GetIntValueAsync();
        }

        public async Task<string> GetValueAsync(int validId)
        {
            if (_logger.IsDebugEnabled)
            {
                _logger.Debug($"Calling Lunch get from service with id '{validId}'");
            }

            return await _lunchRepository.GetValueAsync(validId);
        }

        public async Task<LunchDto> AddLunchAsync(LunchDto lunch)
        {
            return await _lunchRepository.AddLunchAsync(lunch);
        }

        Task<string> ILunchService.GetValueAsync(string validId)
        {
            throw new System.NotImplementedException();
        }

        Task<LunchDto> ILunchService.AddLunchAsync(LunchDto lunch)
        {
            throw new System.NotImplementedException();
        }

        Task<int> ILunchService.GetIntValueAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}