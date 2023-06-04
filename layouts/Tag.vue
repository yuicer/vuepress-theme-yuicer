<template>
  <SiteLayout>
    <div class="card" v-for="tag in $tag.list" :key="tag.name">
      <router-link class="page-link" :to="tag.path">{{ tag.name }}</router-link>
    </div>
  </SiteLayout>
</template>
<style lang="stylus" scoped>
.card
  padding 16px 20px 10px
  margin 16px auto
  border-radius $borderRadius
  box-shadow $boxShadow
  background-color $backgroundColor
  width 300px
</style>
