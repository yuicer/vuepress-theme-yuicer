export default ({ Vue }) => {
  Vue.mixin({
    computed: {
      $sortedPages() {
        let sortedPages = []
        // 保留草稿功能
        // 根据时间进行排序
        sortedPages = this.$site.pages
          .filter(({ regularPath }) => !regularPath.startsWith('/_draft/'))
          .filter(page => page.id)
          .map(page => {
            page.frontmatter.date = page.frontmatter.date || Date.now()
            return page
          })
          .sort((prev, next) => {
            const prevTime = new Date(prev.frontmatter.date).getTime()
            const nextTime = new Date(next.frontmatter.date).getTime()
            return prevTime - nextTime > 0 ? -1 : 1
          })
        return sortedPages
      },

      $pageContext() {
        const sortedPages = this.$sortedPages
        const currentPageIndex = sortedPages.findIndex(
          item => item.regularPath === this.$page.regularPath
        )
        if (currentPageIndex >= 0) {
          const prev = currentPageIndex === 0 ? null : sortedPages[currentPageIndex - 1]
          const next =
            currentPageIndex === sortedPages.length - 1 ? null : sortedPages[currentPageIndex + 1]

          return {
            ...this.$page,
            prev,
            next
          }
        }
        return { info: 'this page has no context pages' }
      }
    }
  })
}
