using Newtonsoft.Json;

namespace LunchApplication.Models.Models
{
    public class LunchDto
    {
        [JsonIgnore]
        public string RestaurantName { get; set; }
        public string RestaurantType { get; set; }
        public string FoodType { get; set; }
        public string Price { get; set; }
    }
}
