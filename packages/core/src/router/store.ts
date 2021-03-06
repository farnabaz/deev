import Route from "./Route";

export const routes: Route[] = [];

export function addRoute(route: Route) {
    routes.push(route);
}

export function addPrefix(controller: string, prefix: string) {
    routes
        .filter((r) => r.controller === controller)
        .forEach((r) => r.prefix = prefix);
}

export function getRoute(controller: string, func: string) {
    let route = routes.find((r) => r.controller === controller && r.func === func);
    if (!route) {
        route = new Route(controller, func);
        routes.push(route);
    }
    return route;
}

export function getRoutes(controller: string) {
    return routes.filter((r) => r.controller === controller);
}
