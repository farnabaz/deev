import chalk from "chalk";
// @ts-ignore
import Table from "./table";

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
    const t = context.routes.map((route: any) => {
        const color = COLORS[route.method];
        return {
            Controller: `${controllerColor(route.controller)}.${functionColor(route.func)}`,
            Method: color(route.method),
            Path: color(route.prefix + route.path),
        };
    });
    Table.printTable(t, "lll", null, { indent: 0, rowSpace: 2 });
}
