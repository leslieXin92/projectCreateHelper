// 查看版本号
const versionOptions = (program) => {
  program.version(require('../../../package.json').version, '-v')
  program.version(require('../../../package.json').version)
}

module.exports = versionOptions
