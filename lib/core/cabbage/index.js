const cabbage = (program) => {
  program
    .command('cabbage')
    .description('Love timer')
    .action(() => {
      const start = new Date('2022-01-18')
      const today = new Date()
      const away = Math.ceil((today - start) / (1000 * 60 * 60 * 24))
      console.log(`Leslie and Cabbage have been together for ${away} days`)
    })
}

module.exports = cabbage
