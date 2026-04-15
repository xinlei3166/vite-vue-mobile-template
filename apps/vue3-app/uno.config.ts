import presetRemToPx from '@unocss/preset-rem-to-px'
import { defineConfig, presetUno, presetAttributify } from 'unocss'

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
  rules: [[/^opacity-(active|disabled)$/, ([, d]) => ({ opacity: `var(--td-${d}-opacity)` })]],
  theme: {
    colors: {
      primary: 'var(--td-brand-color)', // class="bg-primary"
      success: 'var(--td-success-color)',
      error: 'var(--td-error-color)',
      danger: 'var(--td-error-color)',
      warning: 'var(--td-warning-color)',
      text: 'var(--td-text-primary)',
      text2: 'var(--td-text-secondary)',
      text3: 'var(--td-text-disabled)',
      active: 'var(--td-brand-color)',
      background: 'var(--td-bg-color-page)',
      background2: 'var(--td-bg-color-container)',
      border: 'var(--td-border-level-1)'
    }
  }
})
