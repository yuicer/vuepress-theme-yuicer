#!/usr/bin/env node

const program = require('commander')
program.version(require('../package').version).usage('<command> [options]')

program
  .command('create [entry]')
  .description('create a new project powered by vue-cli-service')
  .option('-d, --dest <dir>', 'output directory (default: dist)')
  .action((entry, cmd) => {
    const options = cleanArgs(cmd)
    console.log('cmd', cmd)
    console.log('entry', entry)
    console.log('options', options)
  })

program
  .command('new <name>')
  .description('create a new initial md file for writing')
  .option('-d, --dest<dir>', 'output directory (default: dist)')
  .action((name, cmd) => {
    const options = cleanArgs(cmd)
    require('../lib/new')(options)
  })

program.parse(process.argv)
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}
