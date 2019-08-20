# @yuicer/vuepress-theme-yuicer

> theme-vue for vuepress

> 由于之前一直在用 hexo ，所以有些功能会和 hexo 比较类似，比如页面的样式，文件目录结构的约定【 _post , _draft 】，脚手架命令【 hexo new xxx】 => 【vuepress new xxx】

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

**[示例项目](https://github.com/yuicer/blog)**

### 目录结构

```
docs
  |- .vuepress
  | |- config.js
  |- _post
  | |- post.md
  |- _draft
  | |- draft.md
```

**_由于使用了 plugin-blog 插件，文章请放在 \_post 目录下_**

**_\_draft 用于存放暂不想发布的文稿，⚠️ 这些文稿不会在博客系统中有入口，但依然会被编译，有可以访问到的链接 url_**

### 命令行功能

全局安装 vuepress 脚手架功能 `npm i vuepress -g`

在安装成功本主题后，使用 `vuepress --help` 可看到下面的新命令 new

`vuepress new [targetDir] [title]` 可以方便生成 md 文件。 targetDir 是你的文件目录，类似与上面目录结构的 docs。因为 vuepress 必须知道目标位置，所以必须有这一个路径参数

> A custom command registered by a plugin requires VuePress to locate your site configuration like vuepress dev or vuepress build.

生成的 md 会自动生成 yaml 结构，也可以通过 `--tpl <template>` 的方式传入一个字符串来自己构造 yaml

### 图片系统

图片引用有两种形式，一种是使用完整外链【推荐】【请使用 https 图片】，另一种则是借助 vuepress 提供的 $withBase 。需要将资源图片放在 .vuepress/public/ 文件夹下，然后提供一个绝对路径，该主题会自动使用 $withBase 解析

相关文档 [https://v1.vuepress.vuejs.org/zh/guide/assets.html#%E5%9F%BA%E7%A1%80%E8%B7%AF%E5%BE%84](https://v1.vuepress.vuejs.org/zh/guide/assets.html#%E5%9F%BA%E7%A1%80%E8%B7%AF%E5%BE%84)

### 文章上下文

[vuepress-plugin-sorted-pages](../vuepress-plugin-sorted-pages/README.md)

该插件会自动将当前文章的上一篇和下一篇文章取到后放在全局计算属性 \$sortedPage 中

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
# 文章标题[必须字段]
title: fdsfsdf
# 日期 推荐填写如下格式（会传入 new Date()）[必须字段]
date: 2018-05-04 19:18:40

# 标签, 支持多个
tag: tag1
tag:
- tag1
- tag2

### 列表页封面样式
# 列表封面，在列表页展示，同时会自动在详情页生成一个该 <img/> 标签
img: /niconiconi.jpg
# 封面样式
imgStyle: { height: '100px' }
# 封面列表默认采用列式布局，isFullRow 为 true 时该封面卡片会占满一整行
isFullRow: true
---

```

### [todoList](./TODO.md)
