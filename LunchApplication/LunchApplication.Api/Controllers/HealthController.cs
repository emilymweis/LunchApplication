using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using Chipotle.Core.Logging;
using LunchApplication.Common.Constants;

namespace LunchApplication.Api.Controllers
{
    /// <summary>
    /// The HealthController is used as a convenience method for checking that the service is running.
    /// </summary>
    /// <seealso cref="System.Web.Http.ApiController" />
    [RoutePrefix("health")]
    public class HealthController : ApiController
    {
        private readonly IObjectLogger _logger;

        /// <param name="logger"></param>
        public HealthController(IObjectLogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Oks this instance.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        [Route("check")]
        public async Task<HttpResponseMessage> Get()
        {
            //logging
            if (_logger.IsDebugEnabled)
            {
                await _logger.DebugAsync(GetStatusMessage());
            }

            return await Ok(new
            {
                Message = GetStatusMessage(),
                Status = "OK"
            }).ExecuteAsync(CancellationToken.None);
        }
        /// <summary>
        /// Posts the specified state.
        /// </summary>
        /// <param name="state">The state.</param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        [Route("")]
        public async Task<HttpResponseMessage> Post([FromBody]string state)
        {
            //logging
            if (_logger.IsDebugEnabled)
            {
                await _logger.DebugAsync(GetStatusMessage());
            }

            return await Ok(new
            {
                Message = GetStatusMessage(),
                Status = "OK"
            }).ExecuteAsync(CancellationToken.None);
        }

        private static string GetStatusMessage()
        {
            // This variable is lazy-initialized in Startup as an internal static so that it can be passed to each log instance
            return $"The {AppSettings.ApplicationName} {AppSettings.ApiVersion} service is running on build version {Startup.FileVersion.Value}.";

        }

    }
}
