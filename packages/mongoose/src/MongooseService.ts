import { Service } from "deev";
import mongoose from "mongoose";

export default class MongooseService extends Service {

    async start() {
        const { server } = this.options;
        await mongoose.connect(server.uri, server.options);
    }

    async stop() {
        await mongoose.disconnect();
    }
}