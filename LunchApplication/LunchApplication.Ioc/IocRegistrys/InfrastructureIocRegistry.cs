using System;
using System.Linq;
using Chipotle.Core.Logging;
using Chipotle.Logging.Splunk;
using Core.Common.Implementation;
using Core.Common.Interfaces;
using Core.Common.Services.Interfaces;
using LunchApplication.Common.Constants;
using LunchApplication.Common.Implementation;
using LunchApplication.Common.Interfaces;
using SimpleInjector;

namespace LunchApplication.Ioc.IocRegistrys
{
    internal class InfrastructureIocRegistry
    {
        public static void Register(Container container, string buildVersion)
        {
            // Register infrastructure components    
            container.Register<IConfigurationManager, ConfigurationManager>(Lifestyle.Singleton);
            container.Register<IGlobalObjectLogger>(() =>
            {
                var logger = SplunkLoggerFactory.CreateGlobalLogger();
                logger.CorrelationId =
                    Guid.NewGuid().ToString(); // set correlation id for global logger
                logger.SetProperty("component", "web_service_core"); // identifies the component
                logger.SetProperty("version", AppSettings.ApiVersion);
                logger.SetProperty("build_version", buildVersion);
                return logger;
            }, Lifestyle.Transient);
            container.Register<IObjectLogger>(() =>
            {
                var logger = SplunkLoggerFactory.CreateLogger();
                logger.SetProperty("component", "web_service_core"); // identifies the component
                logger.SetProperty("version", AppSettings.ApiVersion);
                logger.SetProperty("build_version", buildVersion);
                return logger;
            }, Lifestyle.Scoped);

            container.Register<IAppRequestInfo, AppRequestInfo>(
                Lifestyle.Scoped);

            var reqInfoReg =
                Lifestyle.Scoped.CreateRegistration<JwtRequestInfo>(container);
            container.AddRegistration<IJwtRequestInfo>(reqInfoReg);
            container.AddRegistration<IAppRequestInfo>(reqInfoReg);
            container.AddRegistration<IRequestInfo>(reqInfoReg);

            // Register the action filters
            var assemblies = AppDomain.CurrentDomain.GetAssemblies()
                    .Where(x => x.ManifestModule.Name.ToLower().EndsWith(".api.dll"))
                    .ToList();
            assemblies.Add(typeof(IAlwaysActionFilter).Assembly);
            container.RegisterCollection(typeof(IAlwaysActionFilter), assemblies);
            container.RegisterCollection(typeof(IActionFilter<>), assemblies);
        }
    }
}