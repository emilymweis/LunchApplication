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
    public class SampleService : ISampleService

    {
        private readonly ISampleRepository _sampleRepository;
        private readonly IObjectLogger _logger;

        public SampleService(ISampleRepository sampleRepository, IObjectLogger logger)
        {
            _sampleRepository = sampleRepository;
            _logger = logger;
        }

        public async Task<int> GetIntValueAsync()
        {
            if (_logger.IsDebugEnabled)
            {
                _logger.Debug("Calling Sample get int from service");
            }
            return await _sampleRepository.GetIntValueAsync();
        }

        public async Task<string> GetValueAsync(int validId)
        {
            if (_logger.IsDebugEnabled)
            {
                _logger.Debug($"Calling sample get from service with id '{validId}'");
            }

            return await _sampleRepository.GetValueAsync(validId);
        }

        public async Task<SampleDto> AddSampleAsync(SampleDto sample)
        {
            return await _sampleRepository.AddSampleAsync(sample);
        }
    }
}