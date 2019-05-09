<template>
  <div class="categories-wrapper">
    <AriticleAbstractList :data="posts" :pageSplitNum="pageSplitNum" :currentPage="currentPage" />

    <pagination
      :data="posts"
      :pageSplitNum="pageSplitNum"
      :currentPage="currentPage"
      @setCurrentPage="setCurrentPage"
    />
  </div>
</template>

<script>
import AriticleAbstractList from '@theme/components/AriticleAbstractList.vue'
import Pagination from '@theme/components/Pagination.vue'

export default {
  props: {
    isRootPage: {
      type: Boolean,
      default: true
    }
  },
  components: { AriticleAbstractList, Pagination },

  data() {
    return {
      currentPage: 1,
      pageSplitNum: 10
    }
  },

  computed: {
    posts() {
      let posts = []
      if (this.isRootPage) posts = this.$sortedPages
      else posts = this.$category.posts

      return posts
    }
  },

  methods: {
    setCurrentPage(page) {
      this.currentPage = page
      this.$page.currentPage = page
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '../styles/wrapper.styl'
.categories-wrapper
  @extend $wrapper
@media (max-width: $MQMobile)
  .page-edit
    .edit-link
      margin-bottom 0.5rem
    .last-updated
      font-size 0.8em
      float none
      text-align left
</style>
