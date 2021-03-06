﻿using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Core.Common.Services.Filters;
using LunchApplication.Common.Interfaces;
using LunchApplication.Models.Models;
using LunchApplication.Service.Interfaces;

namespace LunchApplication.Api.Controllers
{
    /// <summary>
    /// This is an example of a sample controller.  In your service either delete this controller 
    /// or start with this and
    /// rename as necessary.
    /// </summary>
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("userdata")]
    //[Monitor]
    public class UserController : ApiController
    {
        private readonly IUserService _userService;
        private readonly IAppRequestInfo _appRequestInfo;

        public UserController(IUserService userService,
            IAppRequestInfo appRequestInfo)
        {
            _appRequestInfo = appRequestInfo;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpGet, Route("")]
        public IHttpActionResult GetInt()
        {
            var data= Ok(_userService.Test()); ;
            return data;
        }

        [AllowAnonymous]
        [HttpPost, Route("userlogin")]
        public async Task<IHttpActionResult> VerifyLoginAsync(UserCredentials userCredentials)
        {
            var isOk = await _userService.VerifyLoginAsync(userCredentials.Username, userCredentials.PasswordHash);
            return Ok(isOk);
        }

        [Monitor(Name = "GetUserValue")]
        [HttpGet, Route("{userId}")]
        public async Task<IHttpActionResult> GetAsync(string userId)
        {
            var user = await _userService.GetValueAsync(userId);
            return Ok("user");
        }

        [AllowAnonymous]
        [HttpPost, Route("")]
        public async Task<IHttpActionResult> AddUserAsync(UserOptions userOptions)
        {
            var isOk = await _userService.AddUserAsync(userOptions.Username, userOptions.PasswordHash);
            return Ok(isOk);
        }
}
}