<template>
  <div class="theme-container" :class="pageClasses" :style="pageStyles">
    <Navbar v-if="shouldShowNavbar" />
    <div class="wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
const brightness = 'linear-gradient(#ccc 0%,#ccc 100%)'

import { isExternal } from '@theme/util'
import Navbar from '@theme/components/Navbar.vue'
export default {
  components: { Navbar },
  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar
        },
        userPageClass
      ]
    },
    pageStyles() {
      const { bgImg, bgColor } = this.$site.themeConfig
      return {
        backgroundImage: this.getImgUrl(bgImg),
        backgroundColor: bgColor,
        backgroundAttachment: 'fixed',
        backgroundPositionX: '50%',
        backgroundPositionY: '0%',
        backgroundBlendmode: 'multiply',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }
    }
  },
  methods: {
    getImgUrl(path) {
      return isExternal(path)
        ? `url(${path}),${brightness}`
        : `url(${this.$withBase(path)}),${brightness}`
    }
  }
}
</script>
<style src="prismjs/themes/prism-tomorrow.css"></style>
<style lang="stylus" scoped>
@require '../styles/wrapper.styl'
.wrapper
  @extend $wrapper
</style>
