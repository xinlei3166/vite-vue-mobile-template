import { defineConfig, presetWind, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),
    presetAttributify({
      prefix: 'un-',
      prefixedOnly: false
      // ignoreAttributes: []
    })
  ]
})
