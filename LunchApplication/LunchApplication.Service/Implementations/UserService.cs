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
    public class UserService : IUserService

    {
        private readonly IUserRepository _userRepository;
        private readonly IObjectLogger _logger;

        public UserService(IUserRepository userRepository, IObjectLogger logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        public List<UserOptions> Test()
        {
            return _userRepository.Test();
        }
        public async Task<string> VerifyLogin(string Username, string PasswordHash)
        {
            return await _userRepository.VerifyLogin(Username, PasswordHash);

        }

        public async Task<int> GetIntValueAsync()
        {
            if (_logger.IsDebugEnabled)
            {
                _logger.Debug("Calling User get int from service");
            }
            return await _userRepository.GetIntValueAsync();
        }

        public async Task<string> GetValueAsync(int validId)
        {
            if (_logger.IsDebugEnabled)
            {
                _logger.Debug($"Calling User get from service with id '{validId}'");
            }

            return await _userRepository.GetValueAsync(validId);
        }

        public async Task<UserOptions> AddUserAsync(UserOptions user)
        {
            return await _userRepository.AddUserAsync(user);
        }

        Task<string> IUserService.GetValueAsync(string validId)
        {
            throw new System.NotImplementedException();
        }

        Task<UserOptions> IUserService.AddUserAsync(UserOptions user)
        {
            throw new System.NotImplementedException();
        }

        Task<int> IUserService.GetIntValueAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}