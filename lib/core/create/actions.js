const { promisify } = require('util')
const path = require('path')

const download = promisify(require('download-git-repo'))
const open = require('open')

const repoConfig = require('../../config/repoConfig')
const { commandSpawn } = require('../../utils/terminal')
const templateCompiler = require('../../utils/templateCompiler')
const { createDirSync, writeFile } = require('../../utils/writeFile')

// 创建项目
const createCommandAction = async (projectName, others) => {
  // 1、clone project
  await download(repoConfig.vueRepo, projectName, { clone: true })
  // 2、npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], { cwd: `./${projectName}` })
  // 3、npm run serve
  commandSpawn(command, ['run', 'serve'], { cwd: `./${projectName}` }).then(() => {
    // 4、open in browser
    open('http://localhost:8080/')
  })
}

// 创建组件
const createComponentAction = async (componentName, dest) => {
  // 编译ejs模板
  const content = await templateCompiler('component.ejs', { componentName })
  // 写入文件
  const targetPath = path.resolve(dest, `${componentName}.vue`)
  await writeFile(targetPath, content)
}

// 创建页面及路由
const createPageAndRouteAction = async (pageName, dest) => {
  // 编译ejs模板
  const pageContent = await templateCompiler('component.ejs', { componentName: pageName })
  const routerContent = await templateCompiler('router.ejs', { componentName: pageName })
  // 写入文件
  const targetDest = path.resolve(dest, pageName)
  if (createDirSync(targetDest)) {
    const pageTargetPath = path.resolve(targetDest, `${pageName}.vue`)
    const routerTargetPath = path.resolve(targetDest, 'router.js')
    await writeFile(pageTargetPath, pageContent)
    await writeFile(routerTargetPath, routerContent)
  }
}

// 创建仓库
const createStoreAction = async (storeName, dest) => {
  // 编译ejs模版
  const storeContent = await templateCompiler('store.ejs', {})
  const typeContent = await templateCompiler('type.ejs', {})
  // 写入文件
  const targetDest = path.resolve(dest, storeName)
  if (createDirSync(targetDest)) {
    const storeTargetPath = path.resolve(targetDest, `${storeName}.js`)
    const typeTargetPath = path.resolve(targetDest, 'type.js')
    await writeFile(storeTargetPath, storeContent)
    await writeFile(typeTargetPath, typeContent)
  }
}

module.exports = {
  createCommandAction,
  createComponentAction,
  createPageAndRouteAction,
  createStoreAction
}
