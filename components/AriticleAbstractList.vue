<template>
  <div class="wrapper">
    <div v-for="item in formatData" :key="item.path" class="ariticle" @click="onClick(item)">
      <div class="img" v-if="item.img">
        <img :src="item.img" alt />
      </div>
      <div class="title">{{ item.title }}</div>
      <div class="abstract" v-html="item.excerpt" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'currentPage', 'pageSplitNum'],
  computed: {
    formatData() {
      return this.data.slice(
        (this.currentPage - 1) * this.pageSplitNum,
        this.currentPage * this.pageSplitNum
      )
    }
  },
  methods: {
    onClick({ path }) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper {
  .ariticle {
    cursor: pointer;
    margin: 16px auto;
    padding: 16px 20px;
    line-height: 1.5;
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    transition: transform 0.3s;
    background-color: $backgroundColor;

    &:hover {
      transform: scale(1.05);
      transform-origin: center;
    }

    .title {
      position: relative;
      font-size: 1.28rem;
    }

    .tags {
      .tag-item {
        cursor: pointer;

        &.active {
          color: $accentColor;
        }

        &:hover {
          color: $accentColor;
        }
      }
    }
  }
}
</style>
