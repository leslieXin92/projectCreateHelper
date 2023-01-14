// 帮助面板
const helpOptions = (program) => {
  program
    .option('-d, --dest <dest>', 'a destination folder, example: -d /src/components')
    .option('-f, --framework <freamwork>', 'your framework, example: Vue')

  process.on('--help', () => {
    console.log('')
    console.log('Others:')
    console.log('other options...')
  })
}

module.exports = helpOptions
