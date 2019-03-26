#!/usr/bin/env node

require('@deev/cli').run()
  .catch((error) => {
    require('exit')(2)
  })
