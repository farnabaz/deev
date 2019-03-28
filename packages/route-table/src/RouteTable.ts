import chalk from "chalk";
import { printTable } from "./table";

const COLORS: { [key: string]: (txt: string) => string } = {
    Controller: chalk.cyan,
    DELETE: chalk.red,
    Function: chalk.dim,
    GET: chalk.white,
    POST: chalk.green,
};

export default function RoutePrinterPlugin(context: any) {
    const controllerColor = COLORS.Controller;
    const functionColor = COLORS.Function;
    const table = [];
    for (const controller of context.controllers) {
        for (const route of controller.routes) {
            const color = COLORS[route.method];
            table.push({
                Controller: `${controllerColor(route.controller)}.${functionColor(route.func)}`,
                Method: color(route.method),
                Path: color(route.prefix + route.path),
            });
        }
    }
    printTable(table, "lll", null, { indent: 0, rowSpace: 2 });
}
