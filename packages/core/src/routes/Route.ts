import * as Store from "./store";

export default class Route {

    /**
     * Create a path prefix for all routes on controller
     *
     * @param path prefix path for all routes of the controller
     */
    public static prefix(path: string) {
        return function prefixDecorator(cls: any) {
            const controllerName = cls.name;
            Store.addPrefix(controllerName, path);
        };
    }

    /**
     * Fetch single propery from request query params and assign its value to
     * an argumant of handler function
     *
     * @param path query object path
     */
    public static query(path?: string) {
        return function prefixDecorator(target: any, func: string, index: number) {
            const route = Store.getRoute(target.constructor.name, func);

            route.params[index] = path ? `query.${path}` : "query";
        };
    }

    /**
     * Fetch single propery from request url params and assign its value to
     * an argumant of handler function
     *
     * @param path query object path
     */
    public static param(path?: string) {
        return function prefixDecorator(target: any, func: string, index: number) {
            const route = Store.getRoute(target.constructor.name, func);

            route.params[index] = path ? `params.${path}` : "params";
        };
    }

    /**
     * Fetch single propery from request body and assign its value to
     * an argumant of handler function
     *
     * @param path query object path
     */
    public static body(path?: string) {
        return function prefixDecorator(target: any, func: string, index: number) {
            const route = Store.getRoute(target.constructor.name, func);

            route.params[index] = path ? `body.${path}` : "body";
        };
    }

    /**
     * Create a HTTP route to handle single HTTP method with specific path
     *
     * @param method Route http method
     * @param path Route path
     * @param middlewares List of middlewares
     */
    public static route(method: string, path: string, middlewares?: any[]) {
        return function routeDecorator(target: any, func: string) {
            const route = Store.getRoute(target.constructor.name, func);
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
    public static get(path: string, middlewares?: any[]) {
        return Route.route("GET", path, middlewares);
    }

    /**
     * Create a HTTP route to handle POST requests of specific path
     *
     * @param path Route path
     * @param middlewares List of middlewares
     */
    public static post(path: string, middlewares?: any[]) {
        return Route.route("POST", path, middlewares);
    }

    /**
     * Create a HTTP route to handle PUT requests of specific path
     *
     * @param path Route path
     * @param middlewares List of middlewares
     */
    public static put(path: string, middlewares?: any[]) {
        return Route.route("PUT", path, middlewares);
    }

    /**
     * Create a HTTP route to handle PATCH requests of specific path
     *
     * @param path Route path
     * @param middlewares List of middlewares
     */
    public static patch(path: string, middlewares?: any[]) {
        return Route.route("PATCH", path, middlewares);
    }

    /**
     * Create a HTTP route to handle DELETE requests of specific path
     *
     * @param path Route path
     * @param middlewares List of middlewares
     */
    public static delete(path: string, middlewares?: any[]) {
        return Route.route("DELETE", path, middlewares);
    }

    public controller: string = "";
    public func: string = "";
    public method?: string;
    public path?: string = "";
    public handler?: any;
    public middlewares?: any[] = [];
    public params: any[] = [];
    public prefix?: string = "";

    /**
     *
     * @param controller controller name
     * @param func function name
     */
    constructor(controller: string, func: string) {
        this.controller = controller;
        this.func = func;
    }

}
