class Route {
    controller: string = ''
    func: string = ''
    method?: string
    path?: string
    handler?: any
    middlewares?: any[] = []
    params?: any[] = []
    prefix?: string = ''
}

export const routes: Route[] = []

export function addRoute( route: Route) {
    routes.push(route)
}

export function addPrefix(controller: string, prefix: string) {
    routes
        .filter(r => r.controller === controller)
        .forEach(r => r.prefix = prefix);
}

export function getRoute(controller: string, func: string) {
    let route = routes.find(r => r.controller === controller && r.func === func)
    if (!route) {
        route = {
            controller,
            func,
            params: []
        }
        routes.push(route)
    }
    return route
}