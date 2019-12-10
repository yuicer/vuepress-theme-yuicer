<template>
  <div class="pagation" v-if="$pagination">
    <div v-show="$pagination.hasPrev">
      <router-link class="pre" :to="$pagination.prevLink || ''">Prev</router-link>
    </div>
    <div v-show="$pagination.hasNext">
      <router-link class="next" :to="$pagination.nextLink || ''">Next</router-link>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.pagation {
  text-align: center;
  margin-top: 2rem;
  justify-content: space-between;

  >div {
    background-color: $backgroundColor;
    display: inline-block;
    margin: 0 0.4rem;
    padding: 0.3rem 0.8rem;
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    transition: transform 0.3s;
  }
}
</style>
