using Core.Common.Services.Filters;
using Core.Common.Services.Interfaces;
using Core.Common.Swagger.Filters;
using LunchApplication.Api;
using LunchApplication.Api.Filters;
using LunchApplication.Common.Constants;
using LunchApplication.Common.Interfaces;
using LunchApplication.Ioc;
using Microsoft.Owin;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Owin;
using SimpleInjector;
using SimpleInjector.Advanced;
using SimpleInjector.Integration.WebApi;
using Swashbuckle.Application;
using System;
using System.Configuration;
using System.Diagnostics;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;

[assembly: OwinStartup(typeof(Startup))]
namespace LunchApplication.Api
{
    public class Startup
    {
        // Extract file version
        internal static readonly Lazy<string> FileVersion = new Lazy<string>(() => FileVersionInfo
            .GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion);

        public void Configuration(IAppBuilder app)
        {
            AddWebApiConfiguration(app);
        }

        private void AddWebApiConfiguration(IAppBuilder app)
        {
            var config = new HttpConfiguration();
            var container = IocInitializer.InitializeContainer(RegisterFilters, FileVersion.Value);

            var resolver = new SimpleInjectorWebApiDependencyResolver(container);
            config.DependencyResolver = resolver;

            // An important note: These are executed in reverse order of adding.
            config.Filters.Add(new ExceptionFilterDispatcher(container.GetAllInstances));
            config.Filters.Add(new ActionFilterDispatcher(container.GetAllInstances));
            config.Filters.Add(new AuthorizationFilterDispatcher(container.GetAllInstances));

            config.MapHttpAttributeRoutes();

            ConfigureFormatters(config);
            ConfigureSwagger(config);

            app.UseWebApi(config);

            //var cors = new EnableCorsAttribute("*", "*", "*");
            //config.EnableCors(cors);
        }

        private static void RegisterFilters(Container container)
        {
            // Explicitly register specific ICoreExceptionFilter concrete types
            // in the order that they should be invoked by the ExceptionFilterDispatcher
            container.AppendToCollection(typeof(ICoreAuthorizationFilter), typeof(AuthorizeFilterAttribute));
            container.AppendToCollection(typeof(ICoreExceptionFilter), typeof(NotFoundCoreExceptionFilterAttribute));
            container.AppendToCollection(typeof(ICoreExceptionFilter), typeof(ValidationCoreExceptionFilterAttribute));
            container.AppendToCollection(typeof(ICoreExceptionFilter), typeof(OperationFailedExceptionFilterAttribute));
            container.AppendToCollection(typeof(ICoreExceptionFilter), typeof(UnhandledCoreExceptionFilterAttribute));
        }

        private static void ConfigureFormatters(HttpConfiguration config)
        {
            config.Formatters.XmlFormatter.SupportedMediaTypes.Clear();
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;
        }

        private static void ConfigureSwagger(HttpConfiguration config)
        {
            var isSwaggerEnabled = Convert.ToBoolean(ConfigurationManager.AppSettings[AppSettings.EnableSwagger]);
            if (isSwaggerEnabled)
            {
                config.EnableSwagger(EnableSwagger)
                    .EnableSwaggerUi(c =>
                    {
                        c.DisableValidator();
                        c.DocExpansion(DocExpansion.List);
                    });
            }
        }

        private static void EnableSwagger(SwaggerDocsConfig swaggerDocsConfig)
        {
            swaggerDocsConfig.SingleApiVersion(AppSettings.ApiVersion, $"{AppSettings.ApplicationName} {AppSettings.ApiVersion}");
            swaggerDocsConfig.RootUrl(GetRootUrlFromAppConfig);
            swaggerDocsConfig.IncludeXmlComments(GetXmlCommentsPath());
            swaggerDocsConfig.OperationFilter<SwaggerCorrelationIdHeader>();
            swaggerDocsConfig.OperationFilter<FormatXmlCommentProperties>();
            swaggerDocsConfig.OperationFilter<SwaggerAuthorizationHeader>();
        }

        private static string GetRootUrlFromAppConfig(HttpRequestMessage req)
        {
            return new Uri(req.RequestUri, req.GetRequestContext().VirtualPathRoot).ToString();
        }

        private static string GetXmlCommentsPath()
        {
            return $@"{AppDomain.CurrentDomain.BaseDirectory}\bin\LunchApplication.Api.XML";
        }
    }
}