namespace LunchApplication.Common
{
    public class JwtInfo
    {
        public string Jwt { get; set; }
        public int? CustomerId { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public bool? IsGuest { get; set; }
        public bool? IsAnonymous { get; set; }
    }
}