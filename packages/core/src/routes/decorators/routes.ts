import { getRoute } from "../store";

export function Route(method: string, path: string, middlewares?: any[]) {
    return function routeDecorator(target: any, func: string) {
        target.x = "ddd";
        const route = getRoute(target.constructor.name, func);
        Object.assign(route, {
            handler: target[func],
            method,
            middlewares,
            path,
        });
    };
}

export function Get(path: string, middlewares?: any[]) {
    return Route("GET", path, middlewares);
}

export function Post(path: string, middlewares?: any[]) {
    return Route("POST", path, middlewares);
}

export function Put(path: string, middlewares?: any[]) {
    return Route("PUT", path, middlewares);
}

export function Path(path: string, middlewares?: any[]) {
    return Route("PATCH", path, middlewares);
}

export function Delete(path: string, middlewares?: any[]) {
    return Route("DELETE", path, middlewares);
}