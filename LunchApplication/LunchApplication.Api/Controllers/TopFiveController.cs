using System.Threading.Tasks;
using System.Web.Http;
using Core.Common.Services.Filters;
using LunchApplication.Common.Interfaces;
using LunchApplication.Models.Models;
using LunchApplication.Service.Interfaces;

namespace LunchApplication.Api.Controllers
{
    [RoutePrefix("topfivedata")]
    //[Monitor]
    public class TopFiveController : ApiController
    {
        private readonly ITopFiveService _topFiveService;
        private readonly IAppRequestInfo _appRequestInfo;

        public TopFiveController(ITopFiveService topFiveService,
            IAppRequestInfo appRequestInfo)
        {
            _appRequestInfo = appRequestInfo;
            _topFiveService = topFiveService;
        }

        [AllowAnonymous]
        [HttpPost, Route("topfive")]
        public async Task<IHttpActionResult> SaveTopFive(int userId, string restaurantOne, string restaurantTwo, string restaurantThree, string restaurantFour, string restaurantFive)
        {
            var isOk = await _topFiveService.SaveTopFive(userId, restaurantOne, restaurantTwo, restaurantThree, restaurantFour, restaurantFive);
            return Ok(isOk);
        }

        [AllowAnonymous]
        [HttpGet, Route("")]
        public IHttpActionResult GetInt()
        {
            var data= Ok(_topFiveService.Test()); ;
            return data;
        }

        [Monitor(Name = "GetTopFiveValue")]
        [HttpGet, Route("{topFiveId}")]
        public async Task<IHttpActionResult> GetAsync(string topFiveId)
        {
            var topFive = await _topFiveService.GetValueAsync(topFiveId);
            return Ok("topFive");
        }

        [HttpPost, Route("")]
        public async Task<IHttpActionResult> AddTopFiveAsync([FromBody] TopFiveOptions topFive)
        {
            topFive.Id = _appRequestInfo.TopFiveId;
            return Created(string.Empty, await _topFiveService.AddTopFiveAsync(topFive));
        }
}
}