# @yuicer/vuepress-plugin-sorted-pages

> vuepress-plugin

### 排序标准

排序强依赖于 md yaml 中的 date 属性，date 如果未填写则默认补为最新时间

#### \$sortedPages

这里对全局 \$site.pages 进行排序，增加对约定目录 `/_draft/` 为草稿的功能进行支持，筛选除文章，并按照时间 date 进行排序

```js
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
```

### \$pageContext

根据 `sortedPages` 排序的结果，会生成一个全局计算属性 `$pageContext` ，该属性中会包含 `prev next` 参数，指向排序好的前一个页面，后一个页面。如果没有会返回 null。如果该页面没有上下文页面，`$pageContext` 会返回 `{ info: 'this page has no context pages' }`
