const path = require('path')

module.exports = (options, ctx) => {
  const { layoutComponentMap } = ctx
  const {
    pageEnter = '/',
    pageEnhancers = [],
    postsDir = '_posts',
    categoryIndexPageUrl = '/category/',
    permalink = '/:year/:month/:day/:slug'
  } = options

  const isLayoutExists = name => layoutComponentMap[name] !== undefined
  const getLayout = (name, fallback) => (isLayoutExists(name) ? name : fallback)
  const isDirectChild = regularPath => path.parse(regularPath).dir === '/'

  const enhancers = [
    {
      when: ({ regularPath }) => regularPath === categoryIndexPageUrl,
      frontmatter: { layout: getLayout('Categories', 'Page') }
    },
    {
      when: ({ regularPath }) => regularPath.startsWith('/category/'),
      frontmatter: { layout: getLayout('Category', 'Page') }
    },
    {
      when: ({ regularPath }) => regularPath.startsWith(`/${postsDir}/`),
      frontmatter: {
        layout: getLayout('Post', 'Page'),
        permalink: permalink
      },
      data: { type: 'post' }
    },
    ...pageEnhancers,
    {
      when: ({ regularPath }) => isDirectChild(regularPath),
      frontmatter: { layout: getLayout('Page', 'Layout') },
      data: { type: 'page' }
    }
  ]

  return {
    /**
     * Modify page's metadata according to the habits of blog users.
     */
    extendPageData(pageCtx) {
      const { frontmatter: rawFrontmatter } = pageCtx

      enhancers.forEach(({ when, data = {}, frontmatter = {} }) => {
        if (when(pageCtx)) {
          Object.keys(frontmatter).forEach(key => {
            if (!rawFrontmatter[key]) {
              rawFrontmatter[key] = frontmatter[key]
            }
          })
          Object.assign(pageCtx, data)
        }
      })
    },

    /**
     * Create and category page.
     */
    async ready() {
      const { pages } = ctx
      const categoryMap = {}

      const curryHandler = (scope, map) => (key, pageKey) => {
        if (key) {
          if (!map[key]) {
            map[key] = {}
            map[key].path = `/${scope}/${key}.html`
            map[key].pageKeys = []
          }
          map[key].pageKeys.push(pageKey)
        }
      }

      const handleCategory = curryHandler('category', categoryMap)

      pages.forEach(({ key, frontmatter: { category, categories } }) => {
        if (category) {
          handleCategory(category, key)
        }
        if (Array.isArray(categories)) {
          categories.forEach(category => handleCategory(category, key))
        }
      })

      ctx.categoryMap = categoryMap

      const extraPages = [
        {
          permalink: pageEnter,
          frontmatter: {
            title: `Home`,
            home: true
          }
        },
        {
          permalink: categoryIndexPageUrl,
          frontmatter: { title: `Categories` }
        },
        ...Object.keys(categoryMap).map(categoryName => ({
          permalink: categoryMap[categoryName].path,
          meta: { categoryName },
          frontmatter: { title: `${categoryName} | Category` }
        }))
      ]
      await Promise.all(extraPages.map(page => ctx.addPage(page)))
    },

    /**
     * Generate category metadata.
     */
    async clientDynamicModules() {
      return [
        {
          name: 'category.js',
          content: `export default ${JSON.stringify(ctx.categoryMap, null, 2)}`
        }
      ]
    },

    enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
  }
}
