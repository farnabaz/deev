import { addPrefix, getRoute, addRoute, getRoutes } from "./Routes";

export function Route(method: string, path: string, middlewares?: any[]) {
    return function routeDecorator(target: any, func: string) {
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

export function Query(path?: string) {
    return function prefixDecorator(target: any, func: string, index: number) {
        const route = getRoute(target.constructor.name, func);

        route.params[index] = path ? `query.${path}` : "query";
    };
}
export function Param(path?: string) {
    return function prefixDecorator(target: any, func: string, index: number) {
        const route = getRoute(target.constructor.name, func);

        route.params[index] = path ? `params.${path}` : "params";
    };
}
export function Body(path?: string) {
    return function prefixDecorator(target: any, func: string, index: number) {
        const route = getRoute(target.constructor.name, func);

        route.params[index] = path ? `body.${path}` : "body";
    };
}

export function Prefix(path: string) {
    return function prefixDecorator(cls: any) {
        const controllerName = cls.name;
        addPrefix(controllerName, path);
    };
}

export class Controller {
    public routes: any[] = [];
    constructor() {
        this.routes = getRoutes(this.constructor.name);
    }
}
