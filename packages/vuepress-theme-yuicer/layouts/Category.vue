<template>
  <SiteLayout>
    <Categories :isRootPage="false" />
  </SiteLayout>
</template>

<script>
import Categories from '@theme/components/Categories.vue'
export default {
  components: { Categories }
}
</script>
