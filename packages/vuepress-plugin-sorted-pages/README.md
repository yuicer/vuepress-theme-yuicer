# @yuicer/vuepress-plugin-sorted-pages

> vuepress-plugin

### 排序标准

排序强依赖于 md yaml 中的 date 属性，为 **_必填项_**

#### 排序方法

```js
const sortedPages = this.$site.pages
  .filter(frontmatter => frontmatter.date)
  .sort((prev, next) => {
    const prevTime = new Date(prev.frontmatter.date).getTime()
    const nextTime = new Date(next.frontmatter.date).getTime()
    return prevTime - nextTime > 0 ? -1 : 1
  })
},
```

### 排序结果

根据排序的结果，会对每一个页面生成一个全局计算属性 `$sortedPage` ，该属性中会包含 `prev next` 参数，指向排序好的前一个页面，后一个页面。如果没有会返回 null。如果该页面没有上下文页面，`$sortedPage` 会返回 `{ info: 'this page has no context pages' }`
