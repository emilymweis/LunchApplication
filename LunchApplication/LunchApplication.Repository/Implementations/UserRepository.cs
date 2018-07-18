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
    public class UserRepository : IUserRepository
    {
        private readonly IConfigurationManager _configurationManager;

        public List<UserOptions> Test()
        {
            using (var connection = new SqlConnection(ConfigHelper.LunchDbContextConnectionString))
            {
                return connection.Query<UserOptions>("SELECT * FROM UserOptions").ToList();
            }
        }

        public async Task<bool> VerifyLogin(string Username, string PasswordHash)
        {
            var result = false;

            using (SqlConnection connection = new SqlConnection(ConfigHelper.LunchDbContextConnectionString)) {

                var login = connection.Query("SELECT 1 FROM UserOptions WHERE Username = @user AND PasswordHash = @pass", new { user=Username, pass= PasswordHash });
                if(login.Count() == 1)
                {
                    result = true;
                }
            }
            return result;
        }

        public UserRepository(IConfigurationManager configurationManager)
        {
            _configurationManager = configurationManager;
        }

        public async Task<int> GetIntValueAsync()
        {
            return await Task.FromResult(
                _configurationManager.GetSetting<int>(AppSettings.UserIntValue));
        }

        public async Task<string> GetValueAsync(int validId)
        {
            return await Task.FromResult(_configurationManager.GetSetting(AppSettings.UserValue));
        }

        Task<string> IUserRepository.GetValueAsync(int validId)
        {
            throw new System.NotImplementedException();
        }

        Task<UserOptions> IUserRepository.AddUserAsync(UserOptions User)
        {
            throw new System.NotImplementedException();
        }


        Task<int> IUserRepository.GetIntValueAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}
