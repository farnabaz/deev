export default class Route {
    public controller: string = "";
    public func: string = "";
    public method?: string;
    public path?: string = "";
    public handler?: any;
    public middlewares?: any[] = [];
    public params: any[] = [];
    public prefix?: string = "";

    constructor(controller: string, func: string) {
        this.controller = controller;
        this.func = func;
    }
}
