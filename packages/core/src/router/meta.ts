import Route from "./Route";

function getRoutes(target: object) {
    const routes: { [key: string]: Route } = Reflect.getMetadata("controller::routes", target.constructor) || {};
    return routes;
}

function getRoute(target: object, name: string) {
    const routes: { [key: string]: Route } = Reflect.getMetadata("controller::routes", target.constructor) || {};
    if (!routes.hasOwnProperty(name)) {
        routes[name] = new Route(target.constructor.name, name);
    }
    Reflect.defineMetadata("controller::routes", routes, target.constructor);
    return routes[name];
}

function getGroup(constructor: any) {
    const group: any = Reflect.getMetadata("controller::group", constructor) || {};
    Reflect.defineMetadata("controller::group", group, constructor);
    return group;
}

export default {
    getGroup,
    getRoute,
    getRoutes,
};
