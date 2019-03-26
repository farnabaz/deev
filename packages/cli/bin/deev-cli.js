#!/usr/bin/env node

require('../dist/cli.js').run()
  .catch((error) => {
    console.log(error);
    
    require('exit')(2)
  })
