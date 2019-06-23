export default ({ Vue }, ...arr) => {
  Vue.mixin({
    computed: {
      $sortedPage() {
        let sortedPages = []
        try {
          sortedPages = this.$site.pages
            .filter(({ frontmatter }) => frontmatter.date)
            .sort((prev, next) => {
              const prevTime = new Date(prev.frontmatter.date).getTime()
              const nextTime = new Date(next.frontmatter.date).getTime()
              return prevTime - nextTime > 0 ? -1 : 1
            })
        } catch (err) {
          console.error('the date of frontmatter is required')
        }
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
