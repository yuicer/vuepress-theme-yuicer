const path = require('path')

// Theme API.
module.exports = (options, ctx) => ({
  // 根组件设置
  extendCli(cli) {
    cli
      .command(
        'new [targetDir] [title]',
        'create a new md file, [targetDir] is just like `vuepress dev [docs]` '
      )
      .option('--tpl <template>', 'use given string to fill out the md yaml ')
      .action((targetDir, title, options) => {
        const { tpl } = options
        require('./lib/new')({ targetDir, title, tpl })
      })
  },
  clientRootMixin: path.resolve(__dirname, './model/mixin.js'),
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
    [
      '@vuepress/blog',
      {
        directories: [
          {
            id: 'post',
            dirname: '_post',
            path: '/'
          }
        ],
        frontmatters: [
          {
            id: 'tag',
            keys: ['tag'],
            path: '/tag/',
            layout: 'Tag'
          }
        ]
      }
    ],
    '@vuepress/search',
    '@vuepress/plugin-nprogress',
    '@vuepress/back-to-top',
    ['@vuepress/medium-zoom', { selector: '.page img' }],
    '@yuicer/sorted-pages',
    [
      '@vuepress/google-analytics',
      {
        ga: options.ga || ''
      }
    ]
  ]
})
