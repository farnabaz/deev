import objectPath from "object-path";
import { getRoutes } from "./store";

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
    constructor() {
        this.routes = getRoutes(this.constructor.name);
    }

    public async __handleRequest(route: any, data: IServerData) {
        const args = route.params.map((p: string) => objectPath.get(data, p));

        return await route.handler.apply(this, args);
    }
}
