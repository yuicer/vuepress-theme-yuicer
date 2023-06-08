<template>
  <SiteLayout>
    <main class="page">
      <slot name="top" />

      <div class="page-title">{{ $page.title }}</div>

      <div class="tags">
        <div v-if="$page.frontmatter.tag">
          <span>{{ $page.frontmatter.tag }}</span> 
        </div>
        <div class="time">
          <span>{{ time }}</span>
        </div>
      </div>

      <audio
        v-if="musicId"
        controls
        loop
        autoplay="autoplay"
        :src="`https://music.163.com/song/media/outer/url?id=${musicId}.mp3`"
      ></audio>

      <Content class="theme-yuicer-content" />

      <div class="page-nav" v-if="pageContext">
        <p class="inner">
          <span v-if="pageContext.prev" class="prev">
            <router-link class="prev" :to="pageContext.prev.path">
              <span>←</span>
              {{ pageContext.prev.title || pageContext.prev.path }}
            </router-link>
          </span>

          <span v-if="pageContext.next" class="next">
            <router-link class="next" :to="pageContext.next.path">
              {{ pageContext.next.title || pageContext.next.path }}
              <span>→</span>
            </router-link>
          </span>
        </p>
      </div>

      <Comment v-if="$site.themeConfig.comment"/>

      <slot name="bottom" />
    </main>
  </SiteLayout>
</template>

<script>
import moment from 'moment'
import { Comment } from '@vuepress/plugin-blog/lib/client/components'
import { isExternal } from '@theme/util'

export default {
  components: {
    Comment,
  },
  computed: {
    musicId() {
      const { mid } = this.$page.frontmatter
      return mid || null
    },
    pageContext() {
      return this.$pageContext || null
    },
    time() {
      const { date } = this.$page.frontmatter
      return moment(date).format('MMM D  YYYY')
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
audio
  height: 24px;
  outline: none;
  max-width: 100%;

.page
  word-break: break-all;
  overflow: hidden;
  min-height: 70vh;
  background: $backgroundColor;
  position: relative;

  .page-title
    text-align: center;
    font-size: 1.32rem;

  .tags
    display: flex;
    justify-content: center;
    margin-bottom: 1.2rem;
    transition: color 0.2s;

    span
      color: $tagColor;
      margin: 0 0.4rem;
      font-size: 0.7rem;

  .page-nav
    position: absolute;
    bottom: 0;
    width: calc(100% - 4.4rem);

    .inner
      font-size: 0.8rem;
      overflow: auto; // clear float

    .next
      float: right;
</style>
