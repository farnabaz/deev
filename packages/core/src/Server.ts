import fs from "fs";

import Config from "./Config";
import { routes } from "./Routes";
import Service from "./Service";

export default class Server {
    public plugins: any[] = [];

    public services: Service[] = [];

    public options: Config = new Config({});

    public root: string = "";

    public routes: any[] = [];

    public models: any[] = [];

    constructor(root: string) {
        this.root = root;
        this.options = new Config(this.require("~/deev.config"));
    }

    public resolve(path: string) {
        return path.replace("~", this.root);
    }

    public async import(path: string) {
        let file = await import(this.resolve(path));
        if (file.default) {
            file = file.default;
        }
        return file;
    }

    public require(path: string) {
        let file = require(this.resolve(path));
        if (file.default) {
            file = file.default;
        }
        return file;
    }

    public async loadControllers() {
        const controllers = await fs.readdirSync(this.resolve("~/controllers"));
        await Promise.all(controllers.map((c) => this.import("~/controllers/" + c)));
        this.routes = routes;
    }

    public async loadModels() {
        const models = await fs.readdirSync(this.resolve("~/models"));
        await Promise.all(models.map((c) => this.import("~/models" + c)));
        this.models = routes;
    }

    public async loadPlugins() {
        const pluginsList = this.options.plugins.map(async (plugin: any) => {
            const $plugin = await this.import(plugin);
            return $plugin(this, this.options);
        });
        this.plugins = await Promise.all(pluginsList);
    }

    public async loadServices() {
        const servicesList = this.options.services.map(async (service: any) => {
            const $service = this.require(this.resolve(service));
            return new $service(this, this.options);
        });

        this.services = await Promise.all(servicesList);
    }

    public async init() {
        await this.loadServices();

        await this.loadControllers();

        await this.loadPlugins();

        await Promise.all(this.services.map((service: any) => service.init(this, this.options)));
    }

    public async start() {

        await this.init();

        await Promise.all(this.services.map((service: any) => service.start(this, this.options)));
    }

    public async stop() {

        await Promise.all(this.services.map((service: any) => service.stop(this, this.options)));
    }
}
