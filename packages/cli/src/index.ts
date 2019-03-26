import { Server } from "@deev/core";
import fs from "fs";
import path from "path";
import { register } from "ts-node";

async function run(args: string[]) {
    const argv = args ? Array.from(args) : process.argv.slice(2);

    if ((!argv[0] || argv[0][0] === "-" || fs.existsSync(argv[0]))) {
        argv.unshift("dev");
      }

    const root = path.resolve(argv[1] || ".");

    register();

    const server = new Server(root);

    return server.start();
}

export {
    run,
};
