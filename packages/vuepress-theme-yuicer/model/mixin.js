import { isExternal } from '@theme/util'
export default {
  mounted() {
    const { bgImg, bgColor } = this.$site.themeConfig
    const domApp = document.querySelector('#app')
    if (bgImg && !domApp.style.backgroundImage) domApp.style.backgroundImage = this.getImgUrl(bgImg)

    if (bgColor && !domApp.style.backgroundColor) domApp.style.backgroundColor = bgColor
  },
  methods: {
    getImgUrl(path) {
      return isExternal(path) ? `url(${path})` : `url(${this.$withBase(path)})`
    }
  }
}
