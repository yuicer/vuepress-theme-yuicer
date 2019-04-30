<template>
  <div class="categories-wrapper">
    <h2 v-if="notBasePage" class="title">{{ title }}</h2>

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
    notBasePage: {
      type: Boolean,
      default: false
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
      if (this.notBasePage) {
        posts = this.$category.posts
      } else {
        posts = this.$categories.list.reduce((result, cur) => {
          return result.concat(cur.posts)
        }, [])
      }

      return posts
    },
    title() {
      return this.$page.frontmatter.title.split('|')[0]
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
@require '../styles/wrapper.styl';

.categories-wrapper {
  @extend $wrapper;
}

@media (max-width: $MQMobile) {
  .page-edit {
    .edit-link {
      margin-bottom: 0.5rem;
    }

    .last-updated {
      font-size: 0.8em;
      float: none;
      text-align: left;
    }
  }
}
</style>
