using Core.Common.Implementation;
using LunchApplication.Common.Interfaces;

namespace LunchApplication.Common.Implementation
{
    public class AppRequestInfo : RequestInfo, IAppRequestInfo
    {
        public string LunchId { get; set; }
        public string UserId { get; set; }
    }
}