<template>
  <div
    class="wrapper"
    :style="{
      columns: pages.length > 3 ? '' : '1 auto'
    }"
  >
    <div
      v-for="{
        path,
        title,
        frontmatter: { date, tag, img, imgStyle, isFullRow }
      } in pages"
      :key="path"
      class="ariticle"
      :style="{
        columnSpan: isFullRow ? 'all' : 'none'
      }"
      @click="toDetail(path)"
    >
      <div class="ariticle-title">
        <a>{{ title }}</a>
      </div>
      <div class="tags">
        <div v-if="tag" class="tag">
          <span>{{ tag }}</span> 
        </div>
        <div class="time">
          <span>{{ getTime(date) }}</span>
        </div>
      </div>
      <div class="img" v-if="img">
        <img
          :style="{
            ...imgStyle
          }"
          :src="getImgUrl(img)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { isExternal } from '@theme/util'
export default {
  computed: {
    pages() {
      return (this.$pagination && this.$pagination.pages) || this.$sortedPages
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
      return isExternal(path) ? `${path}` : `${this.$withBase(path)}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper {
  @media (min-width: $MacPro) {
    columns: 3 auto;
    column-gap: 32px;
  }

  @media (max-width: $MacPro) {
    column-gap: 32px;
    columns: 2 auto;
  }

  @media (max-width: $MQMobile) {
    columns: 1 auto;
  }

  .ariticle {
    overflow: hidden;
    break-inside: avoid;
    cursor: pointer;
    text-align: center;
    margin: 24px auto;
    padding: 16px 20px 0px;
    line-height: 1.5;
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    background-color: $backgroundColor;

    .ariticle-title {
      font-size: 1.32rem;

      a {
        font-weight: 400;
      }
    }

    .tags {
      display: flex;
      justify-content: center;
      margin-bottom: 1.2rem;

      a, span {
        color: $tagColor;
        margin: 0 0.4rem;
        font-size: 0.7rem;
      }
    }

    .img {
      box-sizing: border-box;
      width: calc(100% + 40px);
      position: relative;
      left: -20px;
      font-size: 0;

      img {
        width: 100%;
        height: 100%;
        border-radius: $borderRadius;
      }
    }
  }
}
</style>
