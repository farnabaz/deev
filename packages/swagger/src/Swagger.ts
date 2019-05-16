import { Server } from "deev";
import SwaggerController from "./SwaggerController";

let c: any[] = [];

export default function RoutePrinterPlugin(server: Server) {
    c = server.controllers;
    server.registerController(SwaggerController);
}

export function getC() {
    return c;
}
