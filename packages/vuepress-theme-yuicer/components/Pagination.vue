<template>
  <div class="pagation" v-if="$pagination">
    <router-link class="pre" v-show="$pagination.hasPrev" :to="$pagination.prevLink || ''"
      >Prev</router-link
    >
    <router-link class="next" v-show="$pagination.hasNext" :to="$pagination.nextLink || ''"
      >Next</router-link
    >
  </div>
</template>

<style lang="stylus" scoped>
.pagation
  text-align center
  margin-top 2rem
  justify-content space-between
  >a
    background-color $backgroundColor
    display inline-block
    margin 0 0.4rem
    padding 0.3rem 0.8rem
    border-radius $borderRadius
    box-shadow $boxShadow
    transition transform 0.2s
    &:hover
      transform scale(1.1)
      transform-origin center
</style>
