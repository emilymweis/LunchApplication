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
    [RoutePrefix("lunchdata")]
    //[Monitor]
    public class LunchController : ApiController
    {
        private readonly ILunchService _lunchService;
        private readonly IAppRequestInfo _appRequestInfo;

        public LunchController(ILunchService lunchService,
            IAppRequestInfo appRequestInfo)
        {
            _appRequestInfo = appRequestInfo;
            _lunchService = lunchService;
        }

        [AllowAnonymous]
        [HttpGet, Route("")]
        public IHttpActionResult GetInt()
        {
            //var result = await _lunchService.GetIntValueAsync();

            var result = new object[] { new { Name = "chipotle", Type = "fast", Price = "Cheap" }, new { Name = "mcdonalds", Type = "slow", Price = "medium" } };

            return Ok(result);
        }

        [Monitor(Name = "GetLunchValue")]
        [HttpGet, Route("{lunchId}")]
        public async Task<IHttpActionResult> GetAsync(string lunchId)
        {
            var lunch = await _lunchService.GetValueAsync(lunchId);
            return Ok("lunch");
        }

        [HttpPost, Route("")]
        public async Task<IHttpActionResult> AddLunchAsync([FromBody] LunchDto lunch)
        {
            lunch.RestaurantName = _appRequestInfo.LunchId;
            return Created(string.Empty, await _lunchService.AddLunchAsync(lunch));
        }
}
}