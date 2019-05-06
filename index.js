const path = require('path')
const moment = require('moment')

// Theme API.
module.exports = (options, ctx) => ({
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
  enhanceAppFiles: path.resolve(__dirname, 'plugins/plugin-sorted-pages/enhanceAppFile.js'),
  // 增加一个默认主页
  additionalPages: [
    {
      path: '/'
    }
  ],
  alias() {
    const { themeConfig, siteConfig } = ctx
    // resolve algolia
    const isAlgoliaSearch =
      themeConfig.algolia ||
      Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
        base => themeConfig.locales[base].algolia
      )
    return {
      '@AlgoliaSearchBox': isAlgoliaSearch
        ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
        : path.resolve(__dirname, 'noopModule.js')
    }
  },
  plugins: [
    ['@vuepress/active-header-links', options.activeHeaderLinks],
    '@vuepress/plugin-blog',
    '@vuepress/search',
    '@vuepress/plugin-nprogress',
    '@vuepress/back-to-top',
    ['@vuepress/medium-zoom', { selector: '.page img' }],
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          moment.locale(lang)
          return moment(new Date(timestamp))
        }
      }
    ],
    [
      '@vuepress/google-analytics',
      {
        ga: options.ga || ''
      }
    ]
  ]
})
