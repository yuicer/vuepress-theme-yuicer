const path = require('path')
const moment = require('moment')

// Theme API.
module.exports = (options, ctx) => ({
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
    [
      '@vuepress/pagination',
      {
        postsFilter: ({ type, frontmatter: { layout } }) => !type && layout !== 'Category',
        postsSorter: (prev, next) => {
          const prevTime = new Date(
            prev.frontmatter.date || prev.lastUpdated || Date.now()
          ).getTime()
          const nextTime = new Date(
            next.frontmatter.date || next.lastUpdated || Date.now()
          ).getTime()
          return prevTime - nextTime > 0 ? -1 : 1
        }
      }
    ],
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
