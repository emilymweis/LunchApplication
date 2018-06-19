using System;
using System.Collections;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using LunchApplication.Common.Interfaces;

namespace LunchApplication.Api.Filters
{
    public class AuthorizationFilterDispatcher : IAuthorizationFilter
    {
        private readonly Func<Type, IEnumerable> _container;

        public bool AllowMultiple => true;

        public AuthorizationFilterDispatcher(Func<Type, IEnumerable> container)
        {
            _container = container;
        }

        public async Task<HttpResponseMessage> ExecuteAuthorizationFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken,
            Func<Task<HttpResponseMessage>> continuation)
        {
            var authorizationFilters = _container.Invoke(typeof(ICoreAuthorizationFilter));

            // Invocation order is determined via registration order in RegisterFilters() in Startup.cs
            foreach (dynamic authorizationFilter in authorizationFilters)
            {
                authorizationFilter.OnAuthorizationAsync(actionContext, cancellationToken);
            }

            if (actionContext?.Response != null)
            {
                return actionContext.Response;
            }

            // Do not repackage the continuation if we have successfully authed
            // since we want the filters to handle any raw exceptions
            // directly without a modified response
            return await continuation();
        }
    }
}