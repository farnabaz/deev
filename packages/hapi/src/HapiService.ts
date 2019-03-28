import consola from "consola";
import { Controller, Service } from "deev";
import Hapi from "hapi";

export default class TemplateService extends Service {
    public server: Hapi.Server;

    public async init() {
        this.server = await this._createServer(this.options);

        await this._processRoutes(this.server, this.context.controllers);
    }

    public async start() {
        await this._startServer(this.server);
    }

    public async stop() {
        this.server.stop();
    }

    public async _createServer(options: any): Promise<Hapi.Server> {
        const server = await new Hapi.Server({
            host: options.host || "localhost",
            port: options.port || 8080,
        });

        return server;
    }

    public async _processRoutes(server: Hapi.Server, controllers: Controller[]) {
        for (const controller of controllers) {
            for (const route of controller.routes) {
                server.route({
                    method: route.method,
                    path: route.prefix + route.path,
                    async handler(re, h: any) {
                        return await controller.__handleRequest(route, {
                            body: re.payload,
                            params: re.params,
                            query: re.query,
                            render: h.view,
                            request: re,
                            response: h,
                        });
                    },
                });
            }
        }
    }

    public async _startServer(server: Hapi.Server) {
        try {
            await server.start();
        } catch (err) {
            consola.fatal(err);
            process.exit(1);
        }
        consola.success("Server running at: " + server.info.uri);
    }
}
