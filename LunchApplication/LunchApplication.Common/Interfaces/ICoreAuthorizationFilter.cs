using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;

namespace LunchApplication.Common.Interfaces
{
    public interface ICoreAuthorizationFilter
    {
        Task OnAuthorizationAsync(HttpActionContext actionContext, CancellationToken cancellationToken);
    }
}