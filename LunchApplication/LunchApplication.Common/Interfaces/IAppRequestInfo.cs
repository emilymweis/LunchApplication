using Core.Common.Interfaces;

namespace LunchApplication.Common.Interfaces
{
    public interface IAppRequestInfo : IRequestInfo
    {
        string SampleId { get; set; }
    }
}