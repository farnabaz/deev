import { Service } from "deev";
import mongoose from "mongoose";

export default class MongooseService extends Service {

    public async start() {
        const { server } = this.options;
        await mongoose.connect(server.uri, server.options);
    }

    public async stop() {
        await mongoose.disconnect();
    }
}
