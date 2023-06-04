const path = require('path')

module.exports = (options = {}) => ({
  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),
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
  markdown: {
    extendMarkdown: (md) => {
      // 使用更多的 markdown-it 插件!
      md.use(require('markdown-it-katex'))
    }
  },
  plugins: [
    [
      '@vuepress/blog',
      {
        sitemap: options.hostname && {
          hostname: options.hostname
        },
        comment: options.comment && {
          service: 'vssue',
          platform: 'github',
          owner: options.comment.owner,
          // 用于存储 issue 和评论的存储库的名称。
          repo: options.comment.repo,
          // 从 OAuth2 规范中引入的 clientId 和 clientSecret。
          clientId: options.comment.clientId,
          clientSecret: options.comment.clientSecret
        },
        directories: [
          {
            id: 'post',
            dirname: '_post',
            path: '/',
            pagination: {
              lengthPerPage: 10
            }
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
    '@vuepress/plugin-nprogress',
    '@vuepress/back-to-top',
    ['@vuepress/medium-zoom', { selector: '.page img' }],
    ['smooth-scroll', true],
    [
      '@vuepress/google-analytics',
      {
        ga: options.ga || ''
      }
    ]
  ]
})
