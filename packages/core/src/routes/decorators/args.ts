import { getRoute } from "../store";

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