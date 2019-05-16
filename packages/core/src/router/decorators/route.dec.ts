import Meta from "../meta";

/**
 * Create a HTTP route to handle single HTTP method with specific path
 *
 * @param method Route http method
 * @param path Route path
 * @param middlewares List of middlewares
 */
export function Route(method: string, path: string, middlewares?: any[]) {
    return function routeDecorator(target: any, func: string) {
        const route = Meta.getRoute(target, func);
        Object.assign(route, {
            handler: target[func],
            method,
            middlewares,
            path,
        });
    };
}

/**
 * Create a HTTP route to handle GET requests of specific path
 *
 * @param path Route path
 * @param middlewares List of middlewares
 */
export function Get(path: string, middlewares?: any[]) {
    return Route("GET", path, middlewares);
}

/**
 * Create a HTTP route to handle POST requests of specific path
 *
 * @param path Route path
 * @param middlewares List of middlewares
 */
export function Post(path: string, middlewares?: any[]) {
    return Route("POST", path, middlewares);
}

/**
 * Create a HTTP route to handle PUT requests of specific path
 *
 * @param path Route path
 * @param middlewares List of middlewares
 */
export function Put(path: string, middlewares?: any[]) {
    return Route("PUT", path, middlewares);
}

/**
 * Create a HTTP route to handle PATCH requests of specific path
 *
 * @param path Route path
 * @param middlewares List of middlewares
 */
export function Patch(path: string, middlewares?: any[]) {
    return Route("PATCH", path, middlewares);
}

/**
 * Create a HTTP route to handle DELETE requests of specific path
 *
 * @param path Route path
 * @param middlewares List of middlewares
 */
export function Delete(path: string, middlewares?: any[]) {
    return Route("DELETE", path, middlewares);
}