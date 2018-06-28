using Chipotle.Core.Logging;
using Chipotle.Enterprise.Security.Jwt;
using Core.Common.Exceptions;
using Core.Common.Interfaces;
using LunchApplication.Common.Constants;
using LunchApplication.Common.Interfaces;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace LunchApplication.Api.Filters
{
    public class AuthorizeFilterAttribute : AuthorizeAttribute, ICoreAuthorizationFilter
    {
        private readonly IConfigurationManager _configurationManager;
        private readonly IJwtRequestInfo _jwtRequestInfo;
        private readonly IObjectLogger _logger;

        public AuthorizeFilterAttribute(IConfigurationManager configurationManager,
            IJwtRequestInfo jwtRequestInfo, IObjectLogger logger)
        {
            _configurationManager = configurationManager;
            _logger = logger;
            _jwtRequestInfo = jwtRequestInfo;
        }

        public override Task OnAuthorizationAsync(HttpActionContext actionContext,
            CancellationToken cancellationToken)
        {
            ValidateJwtOnAuthorization(actionContext);

            return Task.FromResult(0);
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            ValidateJwtOnAuthorization(actionContext);
        }


        private void ValidateJwtOnAuthorization(HttpActionContext actionContext)
        {
            // If the action has the AllowAnonymous attribute then do not perform any authorization
            if (GetAttribute<AllowAnonymousAttribute>(actionContext) != null)
            {
                return;
            }

            // Basic authorization or jwt authorization (default)
            var securityValidationResult = GetAttribute<BasicAuthorizationAttribute>(actionContext) != null ?
                ValidateBasicAuth(actionContext) :
                ValidateJwt(actionContext);

            if (!securityValidationResult.Valid)
            {
                actionContext.Response =
                    actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized,
                        securityValidationResult.ResponsePayload);
            }
        }

        private SecurityValidationResult ValidateBasicAuth(
            HttpActionContext actionContext)
        {
            try
            {
                var auth = actionContext.Request.Headers.Authorization;
                if (auth == null || auth.Scheme.ToUpperInvariant() != "BASIC")
                {
                    return new SecurityValidationResult(false,
                        "The authorization header scheme is invalid.");
                }

                var authInfo = Encoding.Default.GetString(Convert.FromBase64String(auth.Parameter));
                var tokens = authInfo.Split(':');
                if (tokens.Length != 2)
                {
                    return new SecurityValidationResult(false, "Authentication header is not correctly formed.");
                }

                if (tokens[0] != _configurationManager.GetSetting(AppSettings.BasicAuthUser) ||
                    tokens[1] != _configurationManager.GetSetting(AppSettings.BasicAuthPassword))
                {
                    return new SecurityValidationResult(false, "Invalid user name or password specified.");
                }

                return new SecurityValidationResult(true, string.Empty);
            }
            catch (Exception exception)
            {
                // Logging
                if (_logger.IsErrorEnabled)
                {
                    _logger.Error("Failed to decode basic auth header", exception);
                }
                return new SecurityValidationResult(false, "Failed to decode authentication header.");
            }
        }

        private SecurityValidationResult ValidateJwt(HttpActionContext actionContext)
        {
            try
            {
                var authenticationHeader = actionContext.Request.Headers.Authorization;
                if (authenticationHeader.Scheme.ToUpperInvariant() != "BEARER")
                {
                    return new SecurityValidationResult(false, "The authorization header scheme is invalid.");
                }

                if (string.IsNullOrEmpty(authenticationHeader.Parameter))
                {
                    return new SecurityValidationResult(false, "An authorization header value is required.");
                }

                var customerId = JwtSecurity.GetClaimValue(authenticationHeader.Parameter,
                    JwtSecurity.ClaimCustomerId);

                if (customerId == null)
                {
                    return new SecurityValidationResult(false, "The supplied JWT is missing customer id claim.");
                }

                if (_jwtRequestInfo != null)
                {
                    int.TryParse(customerId, out int parsedCustomerId);
                    if (parsedCustomerId > 0)
                    {
                        _jwtRequestInfo.JwtInfo.CustomerId = parsedCustomerId;
                    }
                    else
                    {
                        return new SecurityValidationResult(false, "The supplied JWT internal id claim has an invalid value.");
                    }
                }

                return new SecurityValidationResult(true, string.Empty);
            }
            catch (Exception exception)
            {
                // Logging
                if (_logger.IsErrorEnabled)
                {
                    _logger.Error("Failed to decode JWT", exception);
                }
                return new SecurityValidationResult(false, "Failed to decode JWT.");
            }
        }

        public static IPAddress GetIp(HttpRequestMessage requestMessage)
        {
            // Owin Hosting
            if (requestMessage.Properties.ContainsKey("MS_OwinContext"))
            {
                return HttpContext.Current != null
                    ? IPAddress.Parse(HttpContext.Current.Request.GetOwinContext().Request.RemoteIpAddress)
                    : null;
            }
            // Web Hosting
            if (requestMessage.Properties.ContainsKey("MS_HttpContext"))
            {
                return HttpContext.Current != null ?
                    IPAddress.Parse(HttpContext.Current.Request.UserHostAddress)
                    : null;
            }
            return null;
        }

        private static T GetAttribute<T>(HttpActionContext actionContext) where T : Attribute
        {
            var attribute = actionContext
                                .ActionDescriptor
                                .GetCustomAttributes<T>()
                                .SingleOrDefault() ?? actionContext
                                .ActionDescriptor.ControllerDescriptor
                                .GetCustomAttributes<T>()
                                .SingleOrDefault();
            return attribute;
        }

        private class SecurityValidationResult
        {
            public SecurityValidationResult(bool valid, string message)
            {
                Valid = valid;
                ResponsePayload = new JObject(new JProperty("message", message),
                    new JProperty("category", CoreExceptionCategory.Security.ToString()));
            }

            public bool Valid { get; }
            public JObject ResponsePayload { get; }
        }
    }
}