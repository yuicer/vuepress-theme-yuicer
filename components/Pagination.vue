<template>
  <div class="pagation" v-if="paginationLength > 1">
    <span class="pre" v-show="currentPage !== 1" @click="goPrev">Pre</span>
    <span class="next" v-show="currentPage < paginationLength" @click="goNext">Next</span>
  </div>
</template>

<script>
export default {
  props: ['data', 'currentPage', 'pageSplitNum'],
  computed: {
    paginationLength() {
      return Math.ceil(this.data.length / this.pageSplitNum)
    }
  },
  methods: {
    goPrev() {
      this.$emit('setCurrentPage', this.currentPage - 1)
    },
    goNext() {
      this.$emit('setCurrentPage', this.currentPage + 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagation
  font-size 0.1rem
  text-align center
  margin-top 2rem
  justify-content space-between
  >span
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
