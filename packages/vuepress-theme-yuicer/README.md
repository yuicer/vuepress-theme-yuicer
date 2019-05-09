# @yuicer/vuepress-theme-yuicer

> theme-vue for vuepress

```shell
 npm i @yuicer/vuepress-theme-yuicer@latest
```

```js
{
  // .vuepress/config.js
  ...,
  theme: '@yuicer/yuicer',
}
```

**[示例项目](https://blog.yuicer.com/)**

### 图片系统

图片引用有两种形式，一种是使用完整外链【推荐】【请使用 https 图片】，另一种则是借助 vuepress 提供的 $withBase 。需要将资源图片放在 .vuepress/public/ 文件夹下，然后提供一个绝对路径，该主题会自动使用 $withBase 解析

相关文档 [https://v1.vuepress.vuejs.org/zh/guide/assets.html#%E5%9F%BA%E7%A1%80%E8%B7%AF%E5%BE%84](https://v1.vuepress.vuejs.org/zh/guide/assets.html#%E5%9F%BA%E7%A1%80%E8%B7%AF%E5%BE%84)

### 时间系统

时间目前采用了 md yaml 中的 date 属性和官方插件 lastUpdated ，优先级以前者为先。推荐填写前者

对于两项都没有的会默认时间为当前时间 Date.now()

该时间会被配置到全局计算属性 `$page.time` 中，同时会根据它来进行时间倒序页面排序。【排序晒续期和排序方法暂不开放】

排序结果会配置到全局计算属性 `$sortedPages` 中。

根据排序的结果，会对每一个页面生成一个全局计算属性 `$sortedPage` ，该属性中会包含 `prev next` 参数，指向排序好的前一个页面，后一个页面。如果没有会返回 null。如果该页面不是被排序了的页面，`$sortedPage` 会返回 `{ info: 'this page is not sorted' }`

### 配置项目

#### 主题配置

```js
themeConfig:{
  ...,
  // 页面的背景图片
  bgImg: 'https://img.yuicer.com/bg/beach.jpg'
}
```

#### md yaml 配置

```yaml
---
title: fdsfsdf
# 分类
category: ariticle
# 列表封面，在列表页展示，同时会自动在详情页生成一个该 <img/> 标签
img: /niconiconi.jpg
# 封面样式
# imgStyle: { height: '100px' }
# 推荐填写该日期
date: 2018-05-04 19:18:40
---

```

### [todoList](./TODO.md)
