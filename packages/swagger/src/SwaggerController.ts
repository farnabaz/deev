import { Controller, Get, Path, Request, Response, Route } from "deev";
import send from "send";
import { getAbsoluteFSPath } from "swagger-ui-dist";

function describeDefinitions(definitions: any[]) {
  const defs: any = {};
  function describe(definition: any) {
    if (defs[definition.name] || definition.prototype.__props__ === undefined) {
      return;
    }
    const props = definition.prototype.__props__;
    const properties = Object.keys(props).reduce((acc: any, key: string) => {
      const model = props[key].def;
      defs[definition.name] = {}; // pre-register definition
      if (model.__MODEL__) {
        describe(model);
        acc[key] = {
          $ref: `#/definitions/${model.name}`,
        };
      } else {
        acc[key] = {
          type: model.name.toLowerCase(),
        };
      }
      return acc;
    }, {});

    defs[definition.name] = {
      properties,
      type: "object",
      xml: {
        name: definition.name,
      },
    };
  }

  definitions.forEach((definition: () => void) => describe(definition));
  return defs;
}

function describeParameters(route: Route) {
  return route.params.map((param: any) => {
    const $path = param.path.split(".");
    const $in = $path[0];

    const schema = param.def.__MODEL__ ? {
      schema: {
        $ref: "#/definitions/" + param.def.name,
      },
    } : {
      type: param.def.name.toLowerCase(),
    };

    return {
      description: "Pet object that needs to be added to the store",
      in: $in,
      name: $path.length > 1 ? $path[1] : $path[0],
      required: true,
      ...schema,
    };
  });
}

export default class SwaggerController extends Controller {
    private json: any = {
        info: {},
        swagger: "2.0",
        tags: [],
    };

    @Get("/swagger.json")
    public async getJSON() {
      const paths: any = {};
      const defs: any[] = [];
      const controllers = this.context.controllers;
      const packageInfo: any = await this.context.import("~/package.json");
      for (const controller of controllers) {
          for (const route of controller.routes) {
              const path = route.path;
              if (!paths[path]) {
                  paths[path] = {};
              }
              route.params.forEach((p: any) => {
                defs.push(p.def);
              });
              paths[path][route.method.toLowerCase()] = {
                consumes: [
                  "application/json",
                  "application/xml",
                ],
                parameters: describeParameters(route),
                produces: [
                  "application/xml",
                  "application/json",
                ],
                responses: {
                  405: {
                    description: "Invalid input",
                  },
                },
                tags: [
                  route.controller,
                ],
                ...(route.swagger || {}),
              };
          }
      }
      this.json.info.version = packageInfo.version;
      this.json.paths = paths;
      this.json.definitions = describeDefinitions(defs);
      return this.json;
    }

    @Get("/swagger/{file}")
    public async getUI(@Request() req: any, @Response() res: any, @Path("file") file: string) {
       return new Promise((resolve, reject) => {
            // create send stream
            const stream = send(req, getAbsoluteFSPath() + "/" + file, {});
            stream.on("end", () => resolve());
            stream.on("error", () => reject());
            // pipe
            stream.pipe(res);
            // return this.json;
       });
    }

    @Get("/swagger")
    public index() {
        return `<!-- HTML for static distribution bundle build -->
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Swagger UI</title>
            <link rel="stylesheet" type="text/css" href="/swagger/swagger-ui.css" >
            <link rel="icon" type="image/png" href="/swagger/favicon-32x32.png" sizes="32x32" />
            <link rel="icon" type="image/png" href="/swagger/favicon-16x16.png" sizes="16x16" />
            <style>
              html
              {
                box-sizing: border-box;
                overflow: -moz-scrollbars-vertical;
                overflow-y: scroll;
              }
              *,
              *:before,
              *:after
              {
                box-sizing: inherit;
              }
              body
              {
                margin:0;
                background: #fafafa;
              }
            </style>
          </head>

          <body>
            <div id="swagger-ui"></div>
            <script src="/swagger/swagger-ui-bundle.js"> </script>
            <script src="/swagger/swagger-ui-standalone-preset.js"> </script>
            <script>
            window.onload = function() {
              // Begin Swagger UI call region
              const ui = SwaggerUIBundle({
                url: "swagger.json",
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                  SwaggerUIBundle.presets.apis,
                  SwaggerUIStandalonePreset
                ],
                plugins: [
                  SwaggerUIBundle.plugins.DownloadUrl
                ],
                layout: "StandaloneLayout"
              })
              // End Swagger UI call region
              window.ui = ui
            }
          </script>
          </body>
        </html>`;
    }

}
