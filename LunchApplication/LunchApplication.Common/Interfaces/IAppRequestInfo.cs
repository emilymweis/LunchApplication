using Core.Common.Interfaces;

namespace LunchApplication.Common.Interfaces
{
    public interface IAppRequestInfo : IRequestInfo
    {
        string LunchId { get; set; }
        string UserId { get; set; }
    }
}