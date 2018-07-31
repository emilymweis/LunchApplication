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
using System.Security.Cryptography;
using System.Text;

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

        public async Task<bool> VerifyLoginAsync(string username, string passwordHash)
        {
            var result = false;
            var hashed = GetHash(username + passwordHash);

            using (SqlConnection connection = new SqlConnection(ConfigHelper.LunchDbContextConnectionString)) {

                var login = await connection.QueryAsync("SELECT 1 FROM UserOptions WHERE Username = @user AND PasswordHash = @pass", new { user=username, pass= hashed });
                result = login.Count() == 1 ? true : false;
            }
            return result;
        }
        public async Task<bool> AddUserAsync(string username, string passwordHash)
        {
            var result = false;
            var hashed = GetHash(username + passwordHash);

            using (SqlConnection connection = new SqlConnection(ConfigHelper.LunchDbContextConnectionString))
            {
                var sql = "IF EXISTS(SELECT 1 FROM dbo.UserOptions WHERE Username = @user) " +
                "BEGIN " +
                    "SELECT 0 " +
                "END " +
                "ELSE " +
                    "BEGIN " +
                        "INSERT INTO dbo.UserOptions " +
                        "(Username, PasswordHash) " +
                        "VALUES (@user, @password) " +
                        "SELECT 1 " +
                    "END ";

                var addUser = await connection.QueryAsync(sql, new { user = username, password = hashed });

                result = addUser.Count() == 1 ? true : false;
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

        Task<int> IUserRepository.GetIntValueAsync()
        {
            throw new System.NotImplementedException();
        }

        private string GetHash(string text)
        {
            // SHA512 is disposable by inheritance.  
            using (var sha256 = SHA256.Create())
            {
                // Send a sample text to hash.  
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(text));
                // Get the hashed string.  
                return BitConverter.ToString(hashedBytes);
            }
        }

        //public Task<bool> AddUserAsync(string Username, string Password)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
