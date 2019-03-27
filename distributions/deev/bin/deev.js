#!/usr/bin/env node

require('@deev/cli').run()
  .catch((error) => {
    require('consola').fatal(error)
    process.exit(2)
  })
