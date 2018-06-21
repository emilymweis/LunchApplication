using System.Configuration;

namespace LunchApplication.Common
{
    public class ConfigHelper
    {
        public static string LunchDbContextConnectionString =ConfigurationManager.ConnectionStrings["LunchDB"].ConnectionString;
    }
}
