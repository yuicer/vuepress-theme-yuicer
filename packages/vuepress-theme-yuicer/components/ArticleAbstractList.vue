<template>
  <div class="wrapper">
    <div
      v-for="{
        path,
        title,
        time,
        excerpt,
        frontmatter: { category, img, imgStyle, isFullRow }
      } in formatData"
      :key="path"
      class="ariticle"
      :style="{
        columnSpan: isFullRow ? 'all' : ''
      }"
      @click="toDetail(path)"
    >
      <div class="ariticle-title" @click.prevent.stop>
        <router-link :to="path">{{ title }}</router-link>
      </div>
      <div class="tags">
        <div v-if="category" class="category" @click.prevent.stop>
          <router-link
            :to="$categories && $categories.list.find(item => item.name === category).path"
            >{{ category }}</router-link
          >
        </div>
        <div class="time">
          <span>{{ getTime(time) }}</span>
        </div>
      </div>
      <div
        class="img"
        v-if="img"
        :style="{
          backgroundImage: getImgUrl(img),
          ...imgStyle
        }"
      ></div>
      <div class="abstract" v-html="excerpt" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { isExternal } from '@theme/util'
export default {
  props: ['data', 'currentPage', 'pageSplitNum'],
  computed: {
    formatData() {
      return this.data.slice(
        (this.currentPage - 1) * this.pageSplitNum,
        this.currentPage * this.pageSplitNum
      )
    }
  },
  methods: {
    toDetail(path) {
      this.$router.push(path)
    },
    getTime(time) {
      return moment(time).format('MMM D  YYYY')
    },
    getImgUrl(path) {
      return isExternal(path) ? `url(${path})` : `url(${this.$withBase(path)})`
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  @media (min-width: $MacPro)
    columns 3 auto
    column-gap 32px
  @media (max-width: $MacPro)
    column-gap 32px
    columns 2 auto
  @media (max-width: $MQMobile)
    columns 1 auto
  .ariticle
    break-inside avoid
    cursor pointer
    text-align center
    margin 16px auto
    padding 16px 20px 10px
    line-height 1.5
    border-radius $borderRadius
    box-shadow $boxShadow
    transition transform 0.2s
    background-color $backgroundColor
    &:hover
      transform scale(1.03)
      transform-origin center
    .ariticle-title
      font-size 1.32rem
      transition color 0.2s
      a
        font-weight 400
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
      width 114%
      position relative
      left -7%
      border-radius $borderRadius
      height 20rem
      background-repeat no-repeat
      background-size cover
      background-position center
      @media (max-width: $MQNarrow)
        height 14rem
      @media (max-width: $MQMobileNarrow)
        height 8rem
    .abstract
      text-align left
      font-size 0.9rem
      >>>img
        max-width 100%
</style>
