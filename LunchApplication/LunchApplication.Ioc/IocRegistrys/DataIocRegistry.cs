using System;
using System.Linq;
using Core.Common.Interfaces;
using SimpleInjector;

namespace LunchApplication.Ioc.IocRegistrys
{
    internal class DataIocRegistry
    {
        public static void Register(Container container)
        {
            // Automatically register repository instances with IRepository interface.
            foreach (var assembly in AppDomain.CurrentDomain.GetAssemblies()
                .Where(a => a.ManifestModule.Name.ToLower().EndsWith(".repository.dll")))
            {
                assembly.GetExportedTypes()
                    .Where(t => t.IsClass && typeof(IRepository).IsAssignableFrom(t)).ToList()
                    .ForEach(
                        t =>
                        {
                            var lifestyle = typeof(IWebRequestRepository).IsAssignableFrom(t)
                                ? Lifestyle.Scoped // This will be async scoped which is per request
                                : Lifestyle.Transient;

                            foreach (var interf in t.GetInterfaces()
                                .Where(x => x != typeof(IRepository) &&
                                            x != typeof(IWebRequestRepository)))
                            {
                                container.Register(interf, t, lifestyle);
                            }
                        });
            }

            // TODO: Add custom repository registrations below for those that don't implement IRepository or IWebRequestRepository
            //container.Register<IMyRepository, MyRepository>();
        }
    }
}