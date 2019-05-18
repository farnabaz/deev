import Meta from "../meta";

export function Request(): ParameterDecorator {
    return function prefixDecorator(target: any, func: string, index: number) {
        const route = Meta.getRoute(target, func);
        const defs = Reflect.getMetadata("design:paramtypes", target, func);

        route.params[index] = {
            def: defs[index],
            path: "request",
        };
    };
}

export function Response(): ParameterDecorator {
    return function prefixDecorator(target: any, func: string, index: number) {
        const route = Meta.getRoute(target, func);
        const defs = Reflect.getMetadata("design:paramtypes", target, func);

        route.params[index] = {
            def: defs[index],
            path: "response",
        };
    };
}
/**
 * Fetch single propery from request query params and assign its value to
 * an argumant of handler function
 *
 * @param path query object path
 */
export function Query(path?: string): ParameterDecorator {
    return function prefixDecorator(target: any, func: string, index: number) {
        const route = Meta.getRoute(target, func);
        const defs = Reflect.getMetadata("design:paramtypes", target, func);

        route.params[index] = {
            def: defs[index],
            path: path ? `query.${path}` : "query",
        };
    };
}

/**
 * Fetch single propery from request url path and assign its value to
 * an argumant of handler function
 *
 * @param path query object path
 */
export function Path(path?: string) {
    return function prefixDecorator(target: any, func: string, index: number) {
        const route = Meta.getRoute(target, func);
        const defs = Reflect.getMetadata("design:paramtypes", target, func);

        route.params[index] = {
            def: defs[index],
            path: path ? `path.${path}` : "path",
        };
    };
}

/**
 * Fetch single propery from request body and assign its value to
 * an argumant of handler function
 *
 * @param path query object path
 */
export function Body() {
    return function prefixDecorator(target: any, func: string, index: number) {
        const route = Meta.getRoute(target, func);
        const defs = Reflect.getMetadata("design:paramtypes", target, func);

        route.params[index] = {
            def: defs[index],
            path: "body",
        };
    };
}
