<template>
  <SiteLayout>
    <Categories v-if="isRootPage" />

    <Page v-else>
      <slot name="page-top" slot="top" />
      <slot name="page-bottom" slot="bottom" />
    </Page>
  </SiteLayout>
</template>

<script>
import Categories from '@theme/components/Categories.vue'
import Page from '@theme/components/Page.vue'

export default {
  components: { Categories, Page },
  computed: {
    isRootPage() {
      return this.$page.path === '/'
    }
  }
}
</script>
