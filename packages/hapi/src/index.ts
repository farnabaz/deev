import { Router } from "deev";
export * from "./HapiService";

class SwaggerDoc {
    public description?: string;
    public tag?: string[];

}

export function swagger(doc: SwaggerDoc) {
    return function swaggerDecorator(target: any, propertyKey: string) {
        const route = Router.getRoute(target.constructor.name, propertyKey);
        Object.assign(route, {
            swagger: doc,
        });
    };
}
