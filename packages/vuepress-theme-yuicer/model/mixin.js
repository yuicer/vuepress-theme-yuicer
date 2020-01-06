import { isExternal } from '@theme/util'
const brightness = 'linear-gradient(#ccc 0%,#ccc 100%)'
export default {
  mounted() {
    const { bgImg, bgColor } = this.$site.themeConfig
    const domApp = document.querySelector('#app')
    if (bgImg && !domApp.style.backgroundImage)
      setTimeout(() => {
        domApp.style.backgroundImage = this.getImgUrl(bgImg)
      }, 0)
    if (bgColor && !domApp.style.backgroundColor)
      setTimeout(() => {
        domApp.style.backgroundColor = bgColor
      }, 0)
  },
  methods: {
    getImgUrl(path) {
      return isExternal(path)
        ? `url(${path}),${brightness}`
        : `url(${this.$withBase(path)}),${brightness}`
    }
  }
}
