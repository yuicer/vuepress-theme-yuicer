// Theme API.
module.exports = (options) => ({
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
  extendMarkdown: (md) => {
    // 使用更多的 markdown-it 插件!
    md.use(require('markdown-it-katex'))
  },
  plugins: [
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
    '@vuepress/plugin-nprogress',
    '@vuepress/back-to-top',
    ['@vuepress/medium-zoom', { selector: '.page img' }],
    '@yuicer/sorted-pages',
    ['smooth-scroll', true],
    [
      '@vuepress/google-analytics',
      {
        ga: options.ga || ''
      }
    ]
  ]
})
