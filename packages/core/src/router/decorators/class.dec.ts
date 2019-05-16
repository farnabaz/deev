import Meta from "../meta";

/**
 * Create a path prefix for all routes on controller
 *
 * @param path prefix path for all routes of the controller
 */
export function prefix(path: string): ClassDecorator {
    return function prefixDecorator(cls: any) {
        const group = Meta.getGroup(cls);
        group.prefix = path;
    };
}
