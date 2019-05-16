import objectPath from "object-path";
import Meta from "./Meta";
import Model from "./Model";
import Route from "./Route";

export interface IServerData {
    body: any;
    path: { [key: string]: any};
    query: { [key: string]: any};
    request: any;
    response: any;
    render: () => any;
}

export default class Controller {

    public readonly routes: Route[] = [];

    public readonly prefix: string;

    public context: any = null;

    constructor(context: any) {
        this.context = context;

        const routes = Meta.getRoutes(this);
        this.routes = Object.values(routes);

        const group = Meta.getGroup(this.constructor);
        this.prefix = group.prefix;
    }

    public async __handleRequest(route: any, data: IServerData) {
        const args = route.params.map((param: any) => {
            const value = objectPath.get(data, param.path);
            if (param.def as Model) {
                return new param.def(value);
            }
            // primitive type
            return param.def(value);
        });

        return await route.handler.apply(this, args);
    }
}
