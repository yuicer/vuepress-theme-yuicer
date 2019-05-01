<template>
  <div class="wrapper">
    <div v-for="item in formatData" :key="item.path" class="ariticle" @click="onClick(item)">
      <div class="title">{{ item.title }}</div>
      <div class="last-updated" v-if="lastUpdated">
        <span>{{ lastUpdated }}</span>
      </div>
      <div
        class="img"
        v-if="item.frontmatter.img"
        :style="{ backgroundImage: `url(${item.frontmatter.img})`, ...item.frontmatter.imgStyle }"
      ></div>
      <div class="abstract" v-html="item.excerpt" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['data', 'currentPage', 'pageSplitNum'],
  computed: {
    formatData() {
      return this.data.slice(
        (this.currentPage - 1) * this.pageSplitNum,
        this.currentPage * this.pageSplitNum
      )
    },
    lastUpdated() {
      return moment(this.$page.lastUpdated).format('MMM D  YYYY')
    }
  },
  methods: {
    onClick({ path }) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  .ariticle
    text-align center
    cursor pointer
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
    .title
      position relative
      font-size 1.28rem
    .last-updated
      font-size 0.6rem
      >span
        color $tagColor
    .img
      box-sizing border-box
      width 110%
      position relative
      left -5%
      border-radius $borderRadius
      height 20rem
      background-repeat no-repeat
      background-size cover
      background-position center
      background-attachment fixed
      border 0.2rem solid $backgroundColor
      @media (max-width: $MQNarrow)
        height 14rem
      @media (max-width: $MQMobileNarrow)
        height 8rem
    .categories
      .category
        cursor pointer
        &.active
          color $accentColor
        &:hover
          color $accentColor
</style>
