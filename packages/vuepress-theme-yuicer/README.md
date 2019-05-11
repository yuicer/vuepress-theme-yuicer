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

### 分页实现

[vuepress-plugin-sorted-pages](../vuepress-plugin-sorted-pages/README.md)

### 配置项目

#### 主题配置

```js
themeConfig:{
  ...,
  // 页面的背景图片
  bgImg: 'https://img.yuicer.com/bg/beach.jpg'
  // 页面的背景颜色
  bgColor: '#f3edeb'
  // 谷歌分析 id
  ga: 'xxx'
}
```

#### md yaml 配置

```yaml
---
# 文章标题
title: fdsfsdf
# 分类
category: ariticle
# 列表封面，在列表页展示，同时会自动在详情页生成一个该 <img/> 标签
img: /niconiconi.jpg
# 封面样式
imgStyle: { height: '100px' }
# 日期 推荐填写如下格式（会传入 new Date()）
date: 2018-05-04 19:18:40
---

```

### [todoList](./TODO.md)
