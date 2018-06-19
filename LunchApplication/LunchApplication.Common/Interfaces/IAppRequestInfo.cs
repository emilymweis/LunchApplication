using Core.Common.Interfaces;

namespace LunchApplication.Common.Interfaces
{
    public interface IAppRequestInfo : IRequestInfo
    {
        string LunchId { get; set; }
    }
}