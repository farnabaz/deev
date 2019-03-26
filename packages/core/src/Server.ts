import fs from 'fs'

import { routes } from './Routes'
import Service from './Service';
import Config from './Config';

export default class Server {
    plugins: any[] = []

    services: Service[] = []

    options: Config = new Config({})

    root: string = ''

    routes: any[] = []

    models: any[] = []

    constructor(root: string) {
        this.root = root
        this.options = new Config(this.require('~/deev.config'))
    }

    resolve(path: string) {
        return path.replace('~', this.root);
    }

    async import(path: string) {
        let file = await import(this.resolve(path))
        if (file.default) {
            file = file.default
        }
        return file
    }

    require(path: string) {
        let file = require(this.resolve(path))
        if (file.default) {
            file = file.default
        }
        return file
    }

    async loadControllers() {
        const controllers = await fs.readdirSync(this.resolve('~/controllers'))
        await Promise.all(controllers.map(c => this.import('~/controllers/' + c)))
        this.routes = routes;
    }

    async loadModels() {
        const models = await fs.readdirSync(this.resolve('~/models'))
        await Promise.all(models.map(c => this.import('~/models' + c)))
        this.models = routes;
    }

    async loadPlugins() {
        const pluginsList = this.options.plugins.map(async (plugin: any) => {
            const $plugin = await this.import(plugin)
            return $plugin(this, this.options)
        })
        this.plugins = await Promise.all(pluginsList)
    }

    async loadServices() {
        const servicesList = this.options.services.map(async (service: any) => {
            const $service = this.require(this.resolve(service))
            return new $service(this, this.options)
        })

        this.services = await Promise.all(servicesList)
    }

    async init() {
        await this.loadServices()

        await this.loadControllers()

        await this.loadPlugins()

        await Promise.all(this.services.map((service: any) => service.init(this, this.options)))
    }

    async start() {

        await this.init()

        await Promise.all(this.services.map((service: any) => service.start(this, this.options)))
    }


    async stop() {

        await Promise.all(this.services.map((service: any) => service.stop(this, this.options)))
    }
}