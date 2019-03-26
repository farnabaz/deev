import Hapi from 'hapi';
import ObjectPath from 'object-path'
import { Service } from "deev";

export default class TemplateService extends Service {
    server: Hapi.Server

    async init() {
        this.server = await this._createServer(this.options)
    
        await this._processRoutes(this.server, this.context.routes)
    }

    async start() {
        await this._startServer(this.server);
    }

    async stop() {
        this.server.stop()
    }

    async _createServer(options: any): Promise<Hapi.Server> {
        const server = await new Hapi.Server({
            host: options.host || 'localhost',
            port: options.port || 8080
        });
        
        return server;
    }

    async _processRoutes(server: Hapi.Server, routes: any[]) {
        routes.forEach(route => server.route({
            method: route.method,
            path: route.prefix + route.path,
            handler: async function(re, h) {
                const data = {
                    params: re.params,
                    body: re.payload,
                    query: re.query,
                    request: re
                };
                const args = route.params.map((p: string) => ObjectPath.get(data, p))
                
                return await route.handler.apply(route.prototype, args)
            }
        }))
    }
    
    async _startServer(server: Hapi.Server) {
        try {
            await server.start();
        }
        catch (err) {
            console.log(err);
            process.exit(1);
        }
        console.log('Server running at:', server.info.uri);
    };
}