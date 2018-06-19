using System.Data.Entity.Validation;
using System.Threading.Tasks;
using Core.Common.Exceptions;
using Core.Common.Interfaces;
using LunchApplication.Common.Constants;
using LunchApplication.Models.Models;
using LunchApplication.Repository.Extensions;
using LunchApplication.Repository.Interfaces;

namespace LunchApplication.Repository.Implementations
{

    /// <summary>
    /// This class illustrates a sample repository implementation.  Because ISampleRepository also 
    /// implements the interface IRepository, it is automatically registered with the dependency 
    /// injection framework.
    /// </summary>
    public class SampleRepository : ISampleRepository
    {
        private readonly IConfigurationManager _configurationManager;

        public SampleRepository(IConfigurationManager configurationManager)
        {
            _configurationManager = configurationManager;
        }

        public async Task<int> GetIntValueAsync()
        {
            return await Task.FromResult(
                _configurationManager.GetSetting<int>(AppSettings.SampleIntValue));
        }

        public async Task<string> GetValueAsync(int validId)
        {
            return await Task.FromResult(_configurationManager.GetSetting(AppSettings.SampleValue));
        }

        public async Task<SampleDto> AddSampleAsync(SampleDto sample)
        {
            try
            {
                return await Task.FromResult(sample);
            }
            catch (DbEntityValidationException dbEntityValidationException)
            {
                throw new ValidationException(dbEntityValidationException.ToValidationResult(),
                    dbEntityValidationException);
            }
        }
    }
}