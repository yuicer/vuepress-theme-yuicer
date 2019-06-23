<template>
  <SiteLayout>
    <ArticleAbstractList />
    <pagination />
  </SiteLayout>
</template>

<script>
import ArticleAbstractList from '@theme/components/ArticleAbstractList.vue'
import Pagination from '@theme/components/Pagination.vue'

export default {
  components: { ArticleAbstractList, Pagination }
}
</script>
