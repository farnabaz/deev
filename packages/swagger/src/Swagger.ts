import { Meta, Server } from "deev";
import SwaggerController from "./SwaggerController";

class SwaggerDoc {
    public summary?: string;
    public description?: string;
    public operationId?: string;
    public deprecated?: boolean;
    public tags?: string[];
}

export default function SwaggerPlugin(server: Server) {
    server.registerController(SwaggerController);
}

export function swagger(doc: SwaggerDoc) {
    return function swaggerDecorator(target: any, propertyKey: string) {
        const route = Meta.getRoute(target.constructor.name, propertyKey);
        Object.assign(route, {
            swagger: doc,
        });
    };
}
