using Newtonsoft.Json;

namespace LunchApplication.Models.Models
{
    public class UserCredentials
    {
        public string Username { get; set; }
        public string PasswordHash { get; set; }
    }
}

