<template>
  <SiteLayout>
    <main class="page">
      <slot name="top" />

      <div class="page-title">{{ $page.title }}</div>

      <div class="tags">
        <div v-if="$page.frontmatter.tag">
          <router-link
            v-for="x in [].concat($page.frontmatter.tag)"
            :key="x"
            :to="$tag && $tag.list.find(y => y.name === x).path"
            >{{ x }}</router-link
          >
        </div>
        <div class="time">
          <span>{{ time }}</span>
        </div>
      </div>

      <img class="img" v-if="$page.frontmatter.img" :src="getImgUrl($page.frontmatter.img)" />
      <Content />

      <div class="page-nav" v-if="sortedPage">
        <p class="inner">
          <span v-if="sortedPage.prev" class="prev">
            <router-link class="prev" :to="sortedPage.prev.path">
              <span>←</span>
              {{ sortedPage.prev.title || sortedPage.prev.path }}
            </router-link>
          </span>

          <span v-if="sortedPage.next" class="next">
            <router-link class="next" :to="sortedPage.next.path">
              {{ sortedPage.next.title || sortedPage.next.path }}
              <span>→</span>
            </router-link>
          </span>
        </p>
      </div>

      <slot name="bottom" />
    </main>
  </SiteLayout>
</template>

<script>
import moment from 'moment'
import { isExternal } from '@theme/util'

export default {
  computed: {
    sortedPage() {
      return this.$sortedPage || null
    },
    time() {
      const { time } = this.$page
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
.page
  min-height 70vh
  background $backgroundColor
  .page-title
    text-align center
    font-size 1.32rem
  .tags
    display flex
    justify-content center
    margin-bottom 1.2rem
    transition color 0.2s
    a, span
      color $tagColor
      margin 0 0.4rem
      font-size 0.6rem
  .img
    box-sizing border-box
    width 100%
    background-repeat no-repeat
    background-size cover
    background-position center
    border 0.2rem solid $backgroundColor
  .page-nav
    margin-top 2rem
    padding-bottom 0
    .inner
      font-size 0.8rem
      overflow auto // clear float
    .next
      float right
</style>
