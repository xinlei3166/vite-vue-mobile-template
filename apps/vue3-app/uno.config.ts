import { defineConfig, presetUno, presetAttributify } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

// https://unocss.dev/interactive/
export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({
      prefix: 'un-',
      prefixedOnly: false
      // ignoreAttributes: []
    }),
    presetRemToPx()
  ],
  // @ts-ignore opacity: active, disabled
  rules: [[/^opacity-(active|disabled)$/, ([, d]) => ({ opacity: `var(--van-${d}-opacity)` })]],
  theme: {
    colors: {
      primary: 'var(--van-primary-color)', // class="bg-primary"
      success: 'var(--van-success-color)',
      error: 'var(--van-danger-color)',
      danger: 'var(--van-danger-color)',
      warning: 'var(--van-warning-color)',
      text: 'var(--van-text-color)',
      text2: 'var(--van-text-color-2)',
      text3: 'var(--van-text-color-3)',
      active: 'var(--van-active-color)',
      background: 'var(--van-background)',
      background2: 'var(--van-background2)',
      border: 'var(--van-border-color)'
    }
  }
})
