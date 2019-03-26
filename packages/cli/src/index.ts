import path from 'path'
import fs from 'fs'
import { register } from 'ts-node'
import { Server } from '@deev/core'

async function run(_argv: string[]) {
    const argv = _argv ? Array.from(_argv) : process.argv.slice(2)

    if ((!argv[0] || argv[0][0] === '-' || fs.existsSync(argv[0]))) {
        argv.unshift('dev')
      }
    
    const root = path.resolve(argv[1] || '.');

    register()

    const server = new Server(root)

    return await server.start()
}

export {
    run
}