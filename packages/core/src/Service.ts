import { Server } from ".";

export default class Service {
    public options?: any;
    public context?: Server;

    constructor(context: any) {
        this.context = context;
        const optionsKey = this.constructor.name;
        this.options = context.options.get(optionsKey);
    }

    public async init(): Promise<void> {
        // Need Implementaion
    }

    public async start(): Promise<void> {
        // Need Implementaion
    }

    public async stop(): Promise<void> {
        // Need Implementaion
    }
}
