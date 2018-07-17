using Newtonsoft.Json;

namespace LunchApplication.Models.Models
{
    public class TopFiveOptions
    {
        [JsonIgnore]
        public int UserId { get; set; }
        public int Id { get; set; }
        public string RestaurantOne { get; set; }
        public string RestaurantTwo { get; set; }
        public string RestaurantThree { get; set; }
        public string RestaurantFour { get; set; }
        public string RestaurantFive { get; set; }
    }
}

