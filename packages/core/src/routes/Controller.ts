import objectPath from "object-path";
import { getRoutes } from "./store";
import Model from "./Model";

export interface IServerData {
    body: any;
    params: { [key: string]: any};
    query: { [key: string]: any};
    request: any;
    response: any;
    render: () => any;
}

export default class Controller {
    public readonly routes: any[] = [];
    public context: any = null;
    constructor(context: any) {
        this.context = context;
        this.routes = getRoutes(this.constructor.name);
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
