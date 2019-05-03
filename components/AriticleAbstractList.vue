<template>
  <div class="wrapper">
    <div v-for="item in formatData" :key="item.path" class="ariticle">
      <div class="ariticle-title" @click="toDetail(item)">{{ item.title }}</div>
      <div class="tags">
        <div
          v-if="item.frontmatter.category"
          @click="toCategories(item.frontmatter.category)"
          class="category"
        >
          <span>{{ item.frontmatter.category }}</span>
        </div>
        <div class="last-updated" v-if="item.lastUpdated">
          <span>{{ getLastUpdated(item.lastUpdated) }}</span>
        </div>
      </div>
      <div
        class="img"
        v-if="item.frontmatter.img"
        :style="{
          backgroundImage: getImgUrl(item.frontmatter.img),
          ...item.frontmatter.imgStyle
        }"
      ></div>
      <div class="abstract" v-html="item.excerpt" />
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
    toDetail({ path }) {
      this.$router.push(path)
    },
    toCategories(name) {
      this.$router.push(this.$categories.list.find(item => item.name === name).path)
    },
    getLastUpdated(time) {
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
  .ariticle
    text-align center
    margin 16px auto
    padding 16px 20px 10px
    line-height 1.5
    border-radius $borderRadius
    box-shadow $boxShadow
    transition transform 0.3s
    background-color $backgroundColor
    &:hover
      transform scale(1.03)
      transform-origin center
    .ariticle-title
      cursor pointer
      font-size 1.28rem
      transition color 0.2s
      &:hover
        color $accentColor
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
      width 114%
      position relative
      left -7%
      border-radius $borderRadius
      height 20rem
      background-repeat no-repeat
      background-size cover
      background-position center
      background-attachment fixed
      border 0.2rem solid $backgroundColor
      @media (max-width: $MQNarrow)
        height 14rem
        border none
      @media (max-width: $MQMobileNarrow)
        height 8rem
        border none
    .abstract
      text-align left
      font-size 0.9rem
</style>
