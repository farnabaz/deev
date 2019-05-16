export default class Model {
    public static readonly __MODEL__ = "1";

    public static Prop(): PropertyDecorator {
        return (target: object, propertyKey: string): void => {
            let props: any;
            const def = Reflect.getMetadata("design:type", target, propertyKey);

            if (target.hasOwnProperty("__props__")) {
                props = (target as any).__props__;
            } else {
                props = (target as any).__props__ = {};
            }
            props[propertyKey] = {
                def,
            };
        };
    }

    constructor(body: any) {
        Object.assign(this, body);
    }
}