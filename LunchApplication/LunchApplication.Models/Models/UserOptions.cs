using Newtonsoft.Json;

namespace LunchApplication.Models.Models
{
    public class UserOptions
    {
        public int UserId { get; set; }
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
    }
}

