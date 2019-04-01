import { register } from "ts-node";
import path from "path";
import Consola from "consola";

export default async (root: string) => {
    register();

    let config: any = null;
    const configPath = path.resolve(root, "deev.config.ts");
    try {
        config = await import(configPath);
        if (config.default) {
            config = config.default;
        }
    } catch (e) {
        if (e.code !== "MODULE_NOT_FOUND") {
            throw e;
        } else {
            Consola.fatal("Cannot find `deev.config.ts`");
            process.exit(1);
        }
    }
    return config;
};
