import { Server } from ".";

export default class Service {
    options?: any
    context?: Server
    constructor(context: any) {
        this.context = context
        const optionsKey = this.constructor.name
        this.options = context.options.get(optionsKey)
    }

    // @ts-ignore
    async init(): Promise<void>{}

    // @ts-ignore
    async start(): Promise<void>{}

    // @ts-ignore
    async stop(): Promise<void> {}
}