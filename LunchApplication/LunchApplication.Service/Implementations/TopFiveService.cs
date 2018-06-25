using System.Collections.Generic;
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
    public class TopFiveService : ITopFiveService

    {
        private readonly ITopFiveRepository _topFiveRepository;
        private readonly IObjectLogger _logger;

        public TopFiveService(ITopFiveRepository topFiveRepository, IObjectLogger logger)
        {
            _topFiveRepository = topFiveRepository;
            _logger = logger;
        }

        public List<TopFiveOptions> Test()
        {
            return _topFiveRepository.Test();
        }

        public async Task<int> GetIntValueAsync()
        {
            if (_logger.IsDebugEnabled)
            {
                _logger.Debug("Calling TopFive get int from service");
            }
            return await _topFiveRepository.GetIntValueAsync();
        }

        public async Task<string> GetValueAsync(int validId)
        {
            if (_logger.IsDebugEnabled)
            {
                _logger.Debug($"Calling TopFive get from service with id '{validId}'");
            }

            return await _topFiveRepository.GetValueAsync(validId);
        }

        public async Task<TopFiveOptions> AddTopFiveAsync(TopFiveOptions topFive)
        {
            return await _topFiveRepository.AddTopFiveAsync(topFive);
        }

        Task<string> ITopFiveService.GetValueAsync(string validId)
        {
            throw new System.NotImplementedException();
        }

        Task<TopFiveOptions> ITopFiveService.AddTopFiveAsync(TopFiveOptions topFive)
        {
            throw new System.NotImplementedException();
        }

        Task<int> ITopFiveService.GetIntValueAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}