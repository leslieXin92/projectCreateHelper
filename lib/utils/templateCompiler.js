const path = require('path')
const ejs = require('ejs')

const templateCompiler = (template, data) => {
  const templateFolderPath = `../template/vue/${template}`
  const templatePath = path.resolve(__dirname, templateFolderPath)
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}

module.exports = templateCompiler
