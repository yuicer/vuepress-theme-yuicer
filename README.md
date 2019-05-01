# @yuicer/vuepress-theme-yuicer

> theme-vue for vuepress

```
 npm i @yuicer/vuepress-theme-yuicer@latest
```

## todo

## 第一阶段

### 主页

1. - [x] 自动生成一个主页
2. - [ ] 主页【封面图，~~下面 list 表~~】

### 分类页

1. - [x] ~~categoty 展示有多少个类别，点击进入 categories~~ 不需要 categoty 页，直接点击可进入
2. - [x] categories 展示当前类别有多少文章 ~~【需不需要公用主页】~~，点击跳转到文章
3. - [ ] 列表页和文章页都有 categories ~~tag~~，可以点击跳转到对应的 categories 页

### extra

- [ ] 动态背景，ui 优化

## 第二阶段

### 三方系统的接入

- [ ] 评论，分析，

### 工具包

- [ ] 自动生成文件模版，自动传服务器，类似 hexo 一样的工具包

#### option

```
themeConfig:{
  ...
  bgImg: // 推荐填写完整的外链 url
}
```

```yaml
---
title: fdsfsdf
category: mmm
# 列表封面
img: https://cloudfront.otakism.com/images/2017/02/pixiv201705.jpg
# 封面样式
imgStyle: { height: '100px' }
---

```
