using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Core.Common.Exceptions;
using Core.Common.Interfaces;
using Dapper;
using LunchApplication.Common.Constants;
using LunchApplication.Models.Models;
using LunchApplication.Repository.Extensions;
using LunchApplication.Repository.Interfaces;
using LunchApplication.Common;

namespace LunchApplication.Repository.Implementations
{

    /// <summary>
    /// This class illustrates a sample repository implementation.  Because ISampleRepository also 
    /// implements the interface IRepository, it is automatically registered with the dependency 
    /// injection framework.
    /// </summary>
    public class TopFiveRepository : ITopFiveRepository
    {
        private readonly IConfigurationManager _configurationManager;

        public List<TopFiveOptions> Test()
        {
            using (var connection = new SqlConnection(ConfigHelper.LunchDbContextConnectionString))
            {
                return connection.Query<TopFiveOptions>("SELECT * FROM TopFiveOptions").ToList();
            }
        }

        public TopFiveRepository(IConfigurationManager configurationManager)
        {
            _configurationManager = configurationManager;
        }

        public async Task<int> GetIntValueAsync()
        {
            return await Task.FromResult(
                _configurationManager.GetSetting<int>(AppSettings.TopFiveIntValue));
        }

        public async Task<string> GetValueAsync(int validId)
        {
            return await Task.FromResult(_configurationManager.GetSetting(AppSettings.TopFiveValue));
        }

        Task<string> ITopFiveRepository.GetValueAsync(int validId)
        {
            throw new System.NotImplementedException();
        }

        Task<TopFiveOptions> ITopFiveRepository.AddTopFiveAsync(TopFiveOptions TopFive)
        {
            throw new System.NotImplementedException();
        }


        Task<int> ITopFiveRepository.GetIntValueAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}
