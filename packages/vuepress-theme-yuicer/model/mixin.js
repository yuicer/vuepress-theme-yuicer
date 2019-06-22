import { isExternal } from '@theme/util'
const brightness = 'linear-gradient(#ccc 0%,#ccc 100%)'
export default {
  mounted() {
    const { bgImg, bgColor } = this.$site.themeConfig
    const domApp = document.querySelector('#app')
    if (bgImg && !domApp.style.backgroundImage) domApp.style.backgroundImage = this.getImgUrl(bgImg)

    if (bgColor && !domApp.style.backgroundColor) domApp.style.backgroundColor = bgColor
  },
  methods: {
    getImgUrl(path) {
      return isExternal(path)
        ? `url(${path}),${brightness}`
        : `url(${this.$withBase(path)}),${brightness}`
    }
  }
}
