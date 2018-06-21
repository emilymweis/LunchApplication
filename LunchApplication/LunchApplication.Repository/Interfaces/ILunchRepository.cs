﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Common.Interfaces;
using LunchApplication.Models.Models;

namespace LunchApplication.Repository.Interfaces
{
    /// <summary>
    /// This interface demonstrates a sample repository interface.  Because it also includes 
    /// IRepository, any implementations of the ISampleRepository interface will automatically 
    /// be registered with dependency injection.
    /// </summary>
    public interface ILunchRepository : IRepository
    {
        Task<string> GetValueAsync(int validId);
        Task<LunchOptions> AddLunchAsync(LunchOptions Lunch);
        Task<int> GetIntValueAsync();
        List<LunchOptions> Test();
    }
}
