import {defineConfig} from 'astro/config'
import vue from '@astrojs/vue'
import nightOwlShikiTheme from './config/Night Owl-color-theme.json'

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  markdown: {
    shikiConfig: {
      theme: nightOwlShikiTheme
    }
  }
})
