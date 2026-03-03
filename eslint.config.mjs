import {defineConfig, globalIgnores} from 'eslint/config'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import vue from 'eslint-plugin-vue'
import globals from 'globals'
import parser from 'astro-eslint-parser'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import js from '@eslint/js'
import {FlatCompat} from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default defineConfig([
  globalIgnores(['**/dist', '.astro']), {
    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:astro/recommended',
      'prettier'
    ),

    plugins: {
      '@typescript-eslint': typescriptEslint,
      vue
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  }, {
    files: ['**/.eslintrc.{js,cjs}'],

    languageOptions: {
      globals: {
        ...globals.node
      },

      ecmaVersion: 5,
      sourceType: 'commonjs'
    }
  }, {
    files: ['**/*.astro'],

    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {varsIgnorePattern: '^Props$'}
      ]
    },

    languageOptions: {
      parser: parser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      }
    }
  }
])