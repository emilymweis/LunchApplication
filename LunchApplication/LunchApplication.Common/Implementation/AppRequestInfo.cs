using Core.Common.Implementation;
using LunchApplication.Common.Interfaces;

namespace LunchApplication.Common.Implementation
{
    public class AppRequestInfo : RequestInfo, IAppRequestInfo
    {
        public int LunchId { get; set; }
        public int UserId { get; set; }
        public int TopFiveId { get; set; }
    }
}