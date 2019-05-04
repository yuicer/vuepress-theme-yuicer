<template>
  <main class="page">
    <slot name="top" />

    <div class="page-title">{{ $page.title }}</div>

    <div class="tags">
      <div
        v-if="$page.frontmatter.category"
        @click="toCategories($page.frontmatter.category)"
        class="category"
      >
        <span>{{ $page.frontmatter.category }}</span>
      </div>
      <div class="last-updated" v-if="lastUpdated">
        <span>{{ lastUpdated }}</span>
      </div>
    </div>

    <img class="img" v-if="$page.frontmatter.img" :src="getImgUrl($page.frontmatter.img)" />
    <Content />

    <div class="page-nav" v-if="prev || next">
      <p class="inner">
        <span v-if="prev" class="prev">
          ←
          <router-link v-if="prev" class="prev" :to="prev.path">
            {{ prev.title || prev.path }}
          </router-link>
        </span>

        <span v-if="next" class="next">
          <router-link v-if="next" :to="next.path">{{ next.title || next.path }}</router-link
          >→
        </span>
      </p>
    </div>

    <slot name="bottom" />
  </main>
</template>

<script>
import moment from 'moment'
import { isExternal } from '@theme/util'
import { resolvePage, outboundRE, endingSlashRE } from '../util'

export default {
  computed: {
    lastUpdated() {
      return this.$page.lastUpdated ? moment(this.$page.lastUpdated).format('MMM D  YYYY') : ''
    },

    prev() {
      const prev = this.$page.frontmatter.prev
      if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      }
      return null
    },

    next() {
      const next = this.$page.frontmatter.next
      if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      }
      return null
    }
  },

  methods: {
    getImgUrl(path) {
      return isExternal(path) ? path : this.$withBase(path)
    }
  }
}

function resolvePrev(page, items) {
  return find(page, items, -1)
}

function resolveNext(page, items) {
  return find(page, items, 1)
}

function find(page, items, offset) {
  const res = []
  flatten(items, res)
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset]
    }
  }
}

function flatten(items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === 'group') {
      flatten(items[i].children || [], res)
    } else {
      res.push(items[i])
    }
  }
}
</script>
<style lang="stylus" scoped>
@require '../styles/wrapper.styl'
.page
  min-height 70vh
  background $backgroundColor
  .page-title
    text-align center
    font-size 1.6rem
  .tags
    display flex
    justify-content center
    margin-bottom 1.2rem
    color $tagColor
    transition color 0.2s
    span
      margin 0 0.4rem
      font-size 0.6rem
    .category
      cursor pointer
      &:hover
        color $accentColor
  .img
    box-sizing border-box
    width 100%
    background-repeat no-repeat
    background-size cover
    background-position center
    border 0.2rem solid $backgroundColor
  .page-nav
    @extend $wrapper
    padding-top 1rem
    padding-bottom 0
    .inner
      min-height 2rem
      margin-top 0
      border-top 1px solid $borderColor
      padding-top 1rem
      overflow auto // clear float
    .next
      float right
</style>
