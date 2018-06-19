using Core.Common.Implementation;
using LunchApplication.Common.Interfaces;

namespace LunchApplication.Common.Implementation
{
    public class AppRequestInfo : RequestInfo, IAppRequestInfo
    {
        public string SampleId { get; set; }
    }
}