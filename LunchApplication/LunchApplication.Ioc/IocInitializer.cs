using System;
using LunchApplication.Ioc.IocRegistrys;
using SimpleInjector;
using SimpleInjector.Lifestyles;

namespace LunchApplication.Ioc
{
    public class IocInitializer
    {
        /// <summary>
        /// Initialize the dependency injection container.
        /// </summary>
        /// <param name="registrationCallback">This callback is for registrations that need to occur 
        /// in the API project of types that the Ioc project may not be aware of.</param>     
        /// <param name="buildVersion">The auto-incrementing File Version generated per build</param>
        /// <returns></returns>
        public static Container InitializeContainer(Action<Container> registrationCallback, string buildVersion)
        {
            var container = new Container();

            container.Options.AllowOverridingRegistrations = true;
            container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();

            InfrastructureIocRegistry.Register(container, buildVersion);
            DataIocRegistry.Register(container);
            ServiceIocRegistry.Register(container);

            registrationCallback(container);

            container.Verify();

            return container;
        }
    }
}
