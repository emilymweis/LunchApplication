using LunchApplication.Common.Interfaces;

namespace LunchApplication.Common.Implementation
{
    public class JwtRequestInfo : AppRequestInfo, IJwtRequestInfo
    {
        public JwtInfo JwtInfo { get; set; }
    }
}