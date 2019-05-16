import path from "path";
import "reflect-metadata";

export default class Route {

    public controller: string = "";
    public func: string = "";
    public method?: string;
    public $path?: string = "";
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

    get path() {
        return path.join(this.prefix, this.$path);
    }

    set path(value: string) {
        this.$path = value;
    }
}
