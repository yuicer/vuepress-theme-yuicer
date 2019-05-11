# @yuicer/vuepress-plugin-sorted-pages

> vuepress-plugin

ps: 由于使用了 vuepress/blog 插件请不要使用 category 文件目录

### 时间系统

时间目前采用了 md yaml 中的 date 属性和官方插件 lastUpdated ，优先级以前者为先。推荐填写前者

对于两项都没有的会默认时间为当前时间 Date.now()

该时间会被配置到全局计算属性 `$page.time` 中，同时会根据它来进行时间倒序页面排序。【排序筛选器和排序方法暂不开放配置】

### 排序结果

排序结果会配置到全局计算属性 `$sortedPages` 中。

根据排序的结果，会对每一个页面生成一个全局计算属性 `$sortedPage` ，该属性中会包含 `prev next` 参数，指向排序好的前一个页面，后一个页面。如果没有会返回 null。如果该页面不是被排序了的页面，`$sortedPage` 会返回 `{ info: 'this page is not sorted' }`
