const { path } = require('@vuepress/shared-utils')
const moment = require('moment')
module.exports = {
  // 增加一个时间参数到 $page
  extendPageData($page) {
    const {
      lastUpdated,
      frontmatter: { date }
    } = $page
    const time = date || lastUpdated || Date.now()
    $page.time = time
  },
  // 注入一个排序好的全局计算属性
  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          moment.locale(lang)
          return moment(new Date(timestamp))
        }
      }
    ]
  ]
}
