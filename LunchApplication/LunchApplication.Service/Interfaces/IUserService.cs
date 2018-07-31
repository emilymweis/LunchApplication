using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Common.Interfaces;
using LunchApplication.Models.Models;

namespace LunchApplication.Service.Interfaces
{
    /// <summary>
    /// This interface demonstrates a sample service interface.  Because it also includes IService, any implementations
    /// of the ISampleService interface will automatically be registered with dependency injection.
    /// </summary>
    public interface IUserService : IService
    {
        Task<string> GetValueAsync(string validId);
        Task<bool> AddUserAsync(string username, string passwordHash);
        Task<int> GetIntValueAsync();
        List<UserOptions> Test();
        Task<bool> VerifyLoginAsync(string Username, string PasswordHash);

    }
}