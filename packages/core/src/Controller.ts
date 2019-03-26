import { addPrefix, getRoute } from './Routes'

export function route(method: string, path: string, middlewares?: any[]) {
    return function routeDecorator(target: any, func: string) {
        const route = getRoute(target.constructor.name, func)
        Object.assign(route, {
            method,
            path,
            handler: target[func],
            middlewares
        })
    }
}

export function Get(path: string, middlewares?: any[]) {
    return route('GET', path, middlewares)
}

export function Post(path: string, middlewares?: any[]) {
    return route('POST', path, middlewares)
}

export function Put(path: string, middlewares?: any[]) {
    return route('PUT', path, middlewares)
}

export function Path(path: string, middlewares?: any[]) {
    return route('PATCH', path, middlewares)
}

export function Delete(path: string, middlewares?: any[]) {
    return route('DELETE', path, middlewares)
}

export function query(path: string) {
    // @ts-ignore
    return function prefixDecorator(target: any, func: string, index: number) {
        const route = getRoute(target.constructor.name, func)
        
        route.params!.push(`query.${path}`)
    }
}
export function param(path: string) {
    // @ts-ignore
    return function prefixDecorator(target: any, func: string, index: number) {
        const route = getRoute(target.constructor.name, func)
        
        route.params!.push(`params.${path}`)
    }
}
export function body(path: string) {
    // @ts-ignore
    return function prefixDecorator(target: any, func: string, index: number) {
        const route = getRoute(target.constructor.name, func)
        
        route.params!.push(`body.${path}`)
    }
}

export function prefix(path: string) {
    return function prefixDecorator(cls: any) {
        const controllerName = cls.name;
        addPrefix(controllerName, path);
    }
}

export class Controller {
    constructor() {

    }
}