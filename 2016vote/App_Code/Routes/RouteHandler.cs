using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;

/// <summary>
/// RouteHandler 的摘要描述
/// </summary>
public class RouteHandler<THandler> : IRouteHandler where THandler : IHttpHandler, new() {
    public IHttpHandler GetHttpHandler(RequestContext requestContext) {
        return new THandler();
    }
}