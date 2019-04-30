<template>
  <div class="theme-container" :class="pageClasses" :style="backgroundStyle">
    <Navbar v-if="shouldShowNavbar" />
    <slot />
  </div>
</template>

<script>
import Navbar from '@theme/components/Navbar.vue'

export default {
  components: { Navbar },
  mounted() {
    console.log('this', this)
  },
  computed: {
    backgroundStyle() {
      const { themeConfig } = this.$site
      const { bgImg } = themeConfig
      if (bgImg)
        return {
          backgroundImage: `url(${bgImg})`,
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
  }
}
</script>
