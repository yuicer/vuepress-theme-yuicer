export default ({ Vue }, ...arr) => {
  Vue.mixin({
    computed: {
      $sortedPages() {
        const sortedPages = this.$site.pages
          .filter(({ type, frontmatter: { layout } }) => !type && layout !== 'Category')
          .sort((prev, next) => {
            const prevTime = new Date(prev.time).getTime()
            const nextTime = new Date(next.time).getTime()
            return prevTime - nextTime > 0 ? -1 : 1
          })

        return sortedPages
      },
      $sortedPage() {
        const sortedPages = this.$sortedPages
        const currentPageIndex = sortedPages.findIndex(item => item.path === this.$page.path)
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
        return { info: 'this page is not sorted' }
      }
    }
  })
}
