const path = require('path')
module.exports = (options, ctx) => ({
  // alias() {
  //   const { themeConfig, siteConfig } = ctx
  //   // resolve algolia
  //   const isAlgoliaSearch =
  //     themeConfig.algolia ||
  //     Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
  //       base => themeConfig.locales[base].algolia
  //     )
  //   return {
  //     '@AlgoliaSearchBox': isAlgoliaSearch
  //       ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
  //       : path.resolve(__dirname, 'noopModule.js')
  //   }
  // },

  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/search',
    '@vuepress/nprogress',
    // '@vuepress/blog',
    // '@vuepress/pagination'
    require('./plugins/pagination'),
    require('./plugins/blog')
    // ['@yubisaki/pagination']
    // '@yubisaki/vuepress-plugin-pagination'
  ]
})
