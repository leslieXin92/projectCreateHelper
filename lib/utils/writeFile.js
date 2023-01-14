const path = require('path')
const fs = require('fs')

// 递归构建文件夹
const createDirSync = (dirPath) => {
  if (fs.existsSync(dirPath)) return true
  if (createDirSync(path.dirname(dirPath))) {
    fs.mkdirSync(dirPath)
    return true
  }
}

const writeFile = (filePath, content) => {
  return fs.promises.writeFile(filePath, content)
}

module.exports = {
  createDirSync,
  writeFile
}
