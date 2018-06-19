using System;
using System.Linq;
using Core.Common.Interfaces;
using SimpleInjector;

namespace LunchApplication.Ioc.IocRegistrys
{
    internal class ServiceIocRegistry
    {
        public static void Register(Container container)
        {
            // Automatically register service instances with IService interface.
            foreach (var assembly in AppDomain.CurrentDomain.GetAssemblies()
                .Where(a => a.ManifestModule.Name.ToLower().EndsWith(".service.dll")))
            {
                assembly.GetExportedTypes()
                    .Where(t => t.IsClass && typeof(IService).IsAssignableFrom(t)).ToList()
                    .ForEach(
                        t =>
                        {
                            var lifestyle = typeof(IWebRequestService).IsAssignableFrom(t)
                                ? Lifestyle.Scoped // This will be async scoped which is per request
                                : Lifestyle.Transient;

                            foreach (var interf in t.GetInterfaces()
                                .Where(x => x != typeof(IService) &&
                                            x != typeof(IWebRequestService)))
                            {
                                container.Register(interf, t, lifestyle);
                            }
                        });
            }

            // TODO: Add custom service registrations below for those that don't implement IService or IWebRequestService
            //container.Register<IMyService, MyService>();
        }
    }
}