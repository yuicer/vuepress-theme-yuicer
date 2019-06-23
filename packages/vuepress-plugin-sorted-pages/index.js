const { path } = require('@vuepress/shared-utils')

module.exports = {
  // 注入一个排序好的全局计算属性
  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
}
