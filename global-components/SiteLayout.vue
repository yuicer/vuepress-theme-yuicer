<template>
  <div class="theme-container" :class="pageClasses">
    <Navbar v-if="shouldShowNavbar" />
    <slot />
  </div>
</template>

<script>
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
    }
  },
  mounted() {
    const userBgImg = this.$site.themeConfig.bgImg
    const domApp = document.querySelector('#app')
    if (userBgImg && !domApp.style.backgroundImage)
      domApp.style.backgroundImage = this.getImgUrl(userBgImg)
  },
  methods: {
    getImgUrl(path) {
      return isExternal(path) ? `url(${path})` : `url(${this.$withBase(path)})`
    }
  }
}
</script>
