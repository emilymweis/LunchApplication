using System.Threading.Tasks;
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