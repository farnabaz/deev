import { Controller, Route, Get, Request, Response, Path } from "deev";
import send from "send";
import { getAbsoluteFSPath } from "swagger-ui-dist";

import { getC } from "./Swagger";

export default class SwaggerController extends Controller {
    private json: any = {
        swagger: "2.0",
        info: {
          description: "This is a sample server Petstore server.",
          version: "1.0.0",
          title: "Swagger Petstore",
          termsOfService: "http://swagger.io/terms/",
          contact: {
            email: "apiteam@swagger.io",
          },
          license: {
            name: "Apache 2.0",
            url: "http://www.apache.org/licenses/LICENSE-2.0.html",
          },
        },
        host: "petstore.swagger.io",
        basePath: "/v2",
        tags: [
          {
            name: "HelloController",
            description: "Everything about your Pets",
            externalDocs: {
              description: "Find out more",
              url: "http://swagger.io",
            },
          },
          {
            name: "store",
            description: "Access to Petstore orders",
          },
          {
            name: "user",
            description: "Operations about user",
            externalDocs: {
              description: "Find out more about our store",
              url: "http://swagger.io",
            },
          },
        ],
        schemes: [
          "https",
          "http",
        ],
    };

    @Get("/swagger.json")
    public getJSON() {
        const paths: any = {};
        const controllers = getC();
        const defs: any = {};
        for (const controller of controllers) {
            for (const route of controller.routes) {
                if (!paths[route.path]) {
                    paths[route.path] = {};
                }
                route.params.forEach((p: any) => {
                  defs[p.def.name] = p.def;
                });
                paths[route.path][route.method.toLowerCase()] = {
                    tags: [
                      route.controller,
                    ],
                    summary: "Add a new pet to the store",
                    description: "",
                    operationId: "addPet",
                    consumes: [
                      "application/json",
                      "application/xml",
                    ],
                    produces: [
                      "application/xml",
                      "application/json",
                    ],
                    parameters: route.params.map((param: any) => ({
                      in: "body",
                      name: "body",
                      description: "Pet object that needs to be added to the store",
                      required: true,
                      schema: {
                        $ref: "#/definitions/" + param.def.name,
                      },
                    })),
                    responses: {
                      405: {
                        description: "Invalid input",
                      },
                    },
                    security: [
                      {
                        petstore_auth: [
                          "write:pets",
                          "read:pets",
                        ],
                      },
                    ],
                  };
            }
        }
        this.json.definitions = defs;
        this.json.paths = paths;
        return this.json;
    }

    @Get("/swagger/{file}")
    public async getUI(@Request() req: any, @Response() res: any, @Path("file") file: string) {
       return new Promise((resolve, reject) => {
            // create send stream
            let stream = send(req, getAbsoluteFSPath() + "/" + file, {});
            stream.on("end", () => resolve());
            stream.on("error", () => reject());

            // // add directory handler
            // stream.on('directory', onDirectory)

            // // add headers listener
            // if (setHeaders) {
            //     stream.on('headers', setHeaders)
            // }

            // add file listener for fallthrough
            // if (fallthrough) {
            // stream.on('file', function onFile () {
            //     // once file is determined, always forward error
            //     forwardError = true
            // })
            // }

            // // forward errors
            // stream.on('error', function error (err) {
            //     if (forwardError || !(err.statusCode < 500)) {
            //         next(err)
            //         return
            //     }

            //     next()
            // })

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
