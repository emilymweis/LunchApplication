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
        private readonly ISampleService _sampleService;
        private readonly IAppRequestInfo _appRequestInfo;

        public LunchController(ISampleService sampleService,
            IAppRequestInfo appRequestInfo)
        {
            _appRequestInfo = appRequestInfo;
            _sampleService = sampleService;
        }

        [AllowAnonymous]
        [HttpGet, Route("")]
        public IHttpActionResult GetInt()
        {
            var result = await _sampleService.GetIntValueAsync();

            //var result = new object[] { new { Name = "chipotle", Type = "fast", Price = "Cheap" }, new { Name = "mcdonalds", Type = "slow", Price = "medium" } };

            return Ok(result);
        }

        [Monitor(Name = "GetSampleValue")]
        [HttpGet, Route("{sampleId}")]
        public IHttpActionResult Get(int sampleId)
        {
            var sample = await _sampleService.GetValueAsync(sampleId);
            return Ok("sample");
        }

        [HttpPost, Route("")]
        public async Task<IHttpActionResult> AddSampleAsync([FromBody] SampleDto sample)
        {
            sample.CustomerId = _appRequestInfo.SampleId;
            return Created(string.Empty, await _sampleService.AddSampleAsync(sample));
        }
}
}