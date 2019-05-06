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
      <div class="time">
        <span>{{ time }}</span>
      </div>
    </div>

    <img class="img" v-if="$page.frontmatter.img" :src="getImgUrl($page.frontmatter.img)" />
    <Content />

    <div class="page-nav" v-if="$sortedPage.prev || $sortedPage.next">
      <p class="inner">
        <span v-if="$sortedPage.prev" class="prev">
          <router-link class="prev" :to="$sortedPage.prev.path">
            <span>←</span>
            {{ $sortedPage.prev.title || $sortedPage.prev.path }}
          </router-link>
        </span>

        <span v-if="$sortedPage.next" class="next">
          <router-link class="next" :to="$sortedPage.next.path">
            {{ $sortedPage.next.title || $sortedPage.next.path }}
            <span>→</span>
          </router-link>
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
    time() {
      const { time } = this.$sortedPage
      return moment(time).format('MMM D  YYYY')
    }
  },

  methods: {
    getImgUrl(path) {
      return isExternal(path) ? path : this.$withBase(path)
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
    margin-top 2rem
    padding-bottom 0
    .inner
      font-size 0.8rem
      overflow auto // clear float
    .next
      float right
</style>
