import { Service } from "deev";
import mongoose from "mongoose";

export default class MongooseService extends Service {

    constructor(context: any) {
        super(context);
        const { server } = this.options;
        if (typeof server !== "object" || !server.uri) {
            throw new Error("Invalid server configuration");
        }
    }

    public async start() {
        const { server } = this.options;
        await mongoose.connect(server.uri, server.options);
    }

    public async stop() {
        await mongoose.disconnect();
    }
}
