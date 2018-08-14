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

        public async Task<string> SaveTopFive(int userId, string restaurantOne, string restaurantTwo, string restaurantThree, string restaurantFour, string restaurantFive)
        {
            var result = "Update Not executed";

            using (SqlConnection connection = new SqlConnection(ConfigHelper.LunchDbContextConnectionString))
            using (SqlCommand command= connection.CreateCommand())
            {
                try
                {
                    command.CommandText = "IF EXISTS(SELECT 1 FROM TopFiveOptions WHERE UserId = @userId) " +
                        "BEGIN  " +
                        "	UPDATE TopFiveOptions  " +
                        "	SET RestaurantOne = @restaurant1, " +
                        "	RestaurantTwo = @restaurant2, " +
                        "	RestaurantThree = @restaurant3, " +
                        "	RestaurantFour = @restaurant4, " +
                        "	RestaurantFive = @restaurant5 " +
                        "	WHERE userId = @userId " +
                        "end " +
                        "else " +
                        "begin " +
                        "	insert into TopFiveOptions " +
                        "	values (@restaurant1, @restaurant2, @restaurant3, @restaurant4, @restaurant5, @userId) " +
                        "end ";

                    
                    
                    command.Parameters.AddWithValue("@restaurant1", restaurantOne);
                    command.Parameters.AddWithValue("@restaurant2", restaurantTwo);
                    command.Parameters.AddWithValue("@restaurant3", restaurantThree);
                    command.Parameters.AddWithValue("@restaurant4", restaurantFour);
                    command.Parameters.AddWithValue("@restaurant5", restaurantFive);
                    command.Parameters.AddWithValue("@userId", userId);

                    connection.Open();

                    result = (await command.ExecuteNonQueryAsync()).ToString() + " Rows updated";

                    connection.Close();
                }
                catch(Exception e)
                {
                    result = e.Message;
                    // result = "Unable to save top 5 do to bad input";
                }
            }
            return result;
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
