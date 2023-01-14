const { createCommandAction, createComponentAction, createPageAndRouteAction, createStoreAction } = require('./actions')

const createCommands = (program) => {
  program
    .command('create <projectName> [others...]')
    .description('clone a repository into a folder')
    .action(createCommandAction)

  program
    .command('addCpn <componentName> [others...]')
    .description('add a Vue component, example: leslie addCpn Home [-d src/components]')
    .action((componentName) => {createComponentAction(componentName, program.opts().dest || 'src/components')})

  program
    .command('addPage <pageName> [others...]')
    .description('add a Vue page and route config, example: leslie addPage Home [-d src/pages]')
    .action((pageName) => {createPageAndRouteAction(pageName, program.opts().dest || 'src/pages')})

  program
    .command('addStore <storeName> [others...]')
    .description('add a store module, example: leslie addStore Account [-d src/store/modules]')
    .action((storeName) => {createStoreAction(storeName, program.opts().dest || 'src/store/modules')})
}

module.exports = createCommands
