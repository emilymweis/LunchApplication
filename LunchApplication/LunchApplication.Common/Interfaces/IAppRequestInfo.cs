using Core.Common.Interfaces;

namespace LunchApplication.Common.Interfaces
{
    public interface IAppRequestInfo : IRequestInfo
    {
        int LunchId { get; set; }
        int UserId { get; set; }
        int TopFiveId { get; set; }
    }
}