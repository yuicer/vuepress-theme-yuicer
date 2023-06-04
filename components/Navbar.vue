<template>
  <header class="navbar" :class="{ 'navbar-hidden': !isShow }">
    <SideBar :links="links" v-if="isShow && links"/>
    <router-link :to="$localePath" class="home-link">
      <img
        class="logo"
        v-if="$site.themeConfig.logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      />
      <span
        ref="siteName"
        class="site-name"
        v-if="$siteTitle"
        :class="{ 'can-hide': $site.themeConfig.logo }"
        >{{ $siteTitle }}</span
      >
    </router-link>

    <div class="links">
      <SearchBox />
    </div>
  </header>
</template>

<script>
import SearchBox from '@theme/components/SearchBox'
import SideBar from '@theme/components/SideBar'

const MIN_NUM = 6

export default {
  components: {  SearchBox ,SideBar},

  data() {
    return {
      isShow: true
    }
  },

  mounted() {
    this.listenScroll()
  },

  computed:{
    links() {
      return this.$site.themeConfig.links 
    },
  },

  methods: {
    listenScroll() {
      let last_known_scroll_position = 0
      window.addEventListener('scroll', e => {
        if (this.isShow === true && last_known_scroll_position + MIN_NUM < window.scrollY) {
          this.isShow = false
        } else if (this.isShow === false && last_known_scroll_position - MIN_NUM > window.scrollY) {
          this.isShow = true
        }
        last_known_scroll_position = window.scrollY
      })
    }
  }
}

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem;
$navbar-horizontal-padding = 1.5rem;

.navbar-hidden {
  transform: translateY(-100%);
}

.navbar {
  padding: $navbar-vertical-padding $navbar-horizontal-padding;
  line-height: $navbarHeight - 1.4rem;
  background: $navbarColor;
  position: fixed;
  display: flex;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  height: $navbarHeight;
  box-shadow: $boxShadow;
  box-sizing: border-box;
  transition: transform 0.3s ease;

  @media (max-width: $MQMobileNarrow) {
    background-color: $backgroundColor;
  }

  a, span, img {
    display: inline-block;
  }

  .logo {
    height: $navbarHeight - 1.4rem;
    min-width: $navbarHeight - 1.4rem;
    border-radius: 50%;
    margin-right: 0.8rem;
    vertical-align: top;
  }

  .site-name {
    font-size: 1.3rem;
    font-weight: 600;
    color: $textColor;
    position: relative;
  }

  .links {
    padding-left: 1.5rem;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 0.9rem;
    position: absolute;
    right: $navbar-horizontal-padding;
    top: $navbar-vertical-padding;
    display: flex;

    .search-box {
      flex: 0 0 auto;
      vertical-align: top;
    }
  }
}

@media (max-width: $MQMobile) {
  .navbar {
    .can-hide {
      display: none;
    }

    .links {
      padding-left: 1.5rem;
    }

    .site-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
