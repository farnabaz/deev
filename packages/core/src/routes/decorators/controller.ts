import { addPrefix } from "../store";

export function Prefix(path: string) {
    return function prefixDecorator(cls: any) {
        const controllerName = cls.name;
        addPrefix(controllerName, path);
    };
}