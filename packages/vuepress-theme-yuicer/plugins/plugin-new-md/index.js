console.log('222', 222)
module.exports = {
  extendCli(cli) {
    console.log('123', 123)
    cli
      .command('new11 [name]', 'create new md file')
      .option('-d, --dir <dir>', 'create new md file in specific file path (default: ./docs)')
      .action((name = '.', commandOptions) => {
        console.log('name', name)
        console.log('commandOptions', commandOptions)
        console.log('Display info of your website')
      })
  }
}
