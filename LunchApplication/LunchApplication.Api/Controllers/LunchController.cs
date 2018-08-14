using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Core.Common.Services.Filters;
using LunchApplication.Common.Interfaces;
using LunchApplication.Models.Models;
using LunchApplication.Service.Interfaces;

namespace LunchApplication.Api.Controllers
{
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
           var data= Ok(_lunchService.Test()); ;
            return data;
        }

        [Monitor(Name = "GetLunchValue")]
        [HttpGet, Route("{lunchId}")]
        public async Task<IHttpActionResult> GetAsync(string lunchId)
        {
            var lunch = await _lunchService.GetValueAsync(lunchId);
            return Ok("lunch");
        }

        [HttpPost, Route("")]
        public async Task<IHttpActionResult> AddLunchAsync([FromBody] LunchOptions lunch)
        {
            lunch.Id = _appRequestInfo.LunchId;
            return Created(string.Empty, await _lunchService.AddLunchAsync(lunch));
        }
}
}