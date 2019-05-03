<template>
  <div class="theme-container" :class="pageClasses" :style="backgroundStyle">
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
    backgroundStyle() {
      const userBgImg = this.$site.themeConfig.bgImg
      if (userBgImg)
        return {
          backgroundImage: this.getImgUrl(userBgImg),
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }
      return null
    },
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
  methods: {
    getImgUrl(path) {
      return isExternal(path) ? `url(${path})` : `url(${this.$withBase(path)})`
    }
  }
}
</script>
