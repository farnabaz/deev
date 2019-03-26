import chalk from 'chalk'
//@ts-ignore
import Table from './table'


const COLORS: { [key: string]: (txt: string)=> string } = {
    GET: chalk.white,
    POST: chalk.green,
    DELETE: chalk.red,
    Controller: chalk.cyan,
    Function: chalk.dim
}

export default function RoutePrinterPlugin(context: any) {
    const controllerColor = COLORS['Controller']
    const functionColor = COLORS['Function']
    const t = context.routes.map((route: any) => {
        const color = COLORS[route.method];
        return {
            Method: color(route.method),
            Path: color(route.prefix + route.path),
            Controller: `${controllerColor(route.controller)}.${functionColor(route.func)}`,
        }
    })
    Table.printTable(t, 'lll', null, { indent: 0, rowSpace: 2 })
}