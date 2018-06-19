namespace LunchApplication.Common.Interfaces
{
    public interface IJwtRequestInfo : IAppRequestInfo
    {
        JwtInfo JwtInfo { get; set; }
    }
}