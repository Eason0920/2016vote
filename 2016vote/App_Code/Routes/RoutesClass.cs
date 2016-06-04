using System.Web.Http;
using System.Web.Routing;

/// <summary>
/// URL Routing
/// </summary>
public class RoutesClass {
    public RoutesClass() { }

    public static void RegisterRoutes(RouteCollection routes) {
        routes.Ignore("{resource}.axd/{*pathInfo}");

        //要回應Client端的Html路由
        routes.Add(string.Empty,
            new Route("{page}", new RouteValueDictionary { { "page", "index" } }, new RouteHandler<HtmlHandler>()));

        //Web API Route
        //routes.MapHttpRoute(
        //    name: "2016VoteApi",
        //    routeTemplate: "api/{controller}"
        //);

        //Web API Route
        routes.MapHttpRoute(
            name: "2016VoteApi",
            routeTemplate: "api/{controller}/{value}",
            defaults: new
            {
                value = RouteParameter.Optional
            }
        );
    }
}