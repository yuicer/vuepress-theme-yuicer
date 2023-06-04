<template>
  <div class="sidebar" v-if="links">
    <svg class="icon" viewBox="64 64 896 896" focusable="false" data-icon="menu" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path></svg>
    <div class="pan">
    <div
      class="link-item"
      :key="index"
      v-for="({text,link}, index) in links"
    >
      <a :href="link" target="_blank">{{ text }}</a>
    </div>
    </div>
  </div>
</template>

<script> 
export default {
  props: {
    links: {
      required: true
    }
  },

  computed: {
    
  },

  methods: {
     
  }
}
</script>

<style lang="stylus">
.sidebar {
  .icon {
    position relative;
    top: 0.4rem;
    z-index: 9;
    margin-right: 1rem;
    width: 1.5rem;
    cursor: pointer;
    height: 1.5rem;
  }
  &:hover .pan{
    visibility: visible;
    opacity: 1;
  }
  .pan {
    transition: opacity 200ms;
    opacity: 0;
    visibility: hidden;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 40%;
    min-width: 180px;
    max-width: 300px;

    padding-top : $navbarHeight + 2em;
    box-shadow: $boxShadow;
    background: #f9f9f9;

    .link-item {
      padding: 0 1.5rem;
    }
  }
}
</style>
