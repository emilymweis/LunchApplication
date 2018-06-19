using Newtonsoft.Json;

namespace LunchApplication.Models.Models
{
    public class SampleDto
    {
        [JsonIgnore]
        public string CustomerId { get; set; }
        public string SomeRequiredValue { get; set; }
    }
}
