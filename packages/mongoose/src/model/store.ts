import { Schema } from "mongoose";

class Definition {
  public fields: { [key: string]: any } = {};
  public preHooks: any[] = [];
  public postHooks: any[] = [];
  public methods: any[] = [];

  public addField(name: string, value: any) {
    this.fields[name] = value;
  }

  public addPreHook(method: string, handler: any) {
    this.preHooks.push({
      handler,
      method,
    });
  }

  public addPostHook(method: string, handler: any) {
    this.postHooks.push({
      handler,
      method,
    });
  }

  public addMethod(name: string, handler: any) {
    this.methods.push({
      handler,
      name,
    });
  }

  public createSchema(decoratedClass: any, options: any): Schema {
    const schema = new Schema(this.fields, options);

    this._applyHooks(schema);
    this._applyMethods(schema);
    this._applyStatics(decoratedClass, schema);

    return schema;
  }

  public _applyStatics(decoratedClass: any, schema: Schema) {
    Object.getOwnPropertyNames(decoratedClass).forEach((p) => {
        if (typeof decoratedClass[p] === "function") {
        schema.statics[p] = decoratedClass[p];
        }
    });
  }

  public _applyHooks(schema: Schema) {
    this.preHooks.forEach((hook) => {
      schema.pre(hook.method, hook.handler);
    });
    this.postHooks.forEach((hook) => {
      schema.post(hook.method, hook.handler);
    });
  }

  public _applyMethods(schema: Schema) {
    this.methods.forEach((method) => {
      schema.methods[method.name] = method.handler;
    });
  }
}

const definitions: { [key: string]: Definition } = {};

export function findDefinition(name: string): Definition {
  if (definitions[name] === undefined) {
    definitions[name] = new Definition();
  }
  return definitions[name];
}
