import {defineConfig} from 'astro/config'
import nightOwlShikiTheme from './config/Night Owl-color-theme.json'

import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.erikostrom.com',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: nightOwlShikiTheme,
    },
  },
})
