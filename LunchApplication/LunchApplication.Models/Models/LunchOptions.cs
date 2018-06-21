using Newtonsoft.Json;

namespace LunchApplication.Models.Models
{
    public class LunchOptions
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string RestaurantName { get; set; }
        public string RestaurantType { get; set; }
        public string FoodType { get; set; }
        public string Price { get; set; }
    }
}

