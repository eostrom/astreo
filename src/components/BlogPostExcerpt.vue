<template>
  <article>
    <h2>
      <time :datetime="date.toISOString()">
        {{ shortDate }}
      </time>
      {{ ' ' }}
      <a :href="path">{{ title }}</a>
    </h2>
  </article>
</template>

<script>
import {parseISO} from 'date-fns'
import {slugify} from '../utils/slugify'

const shortDateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
})

export default {
  name: 'BlogPostExcerpt',

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  computed: {
    title() {
      return this.post.data.title
    },

    slug() {
      return `${slugify(this.post.data.title)}`
    },

    path() {
      return `${this.slug}/`
    },

    date() {
      return parseISO(this.post.data.date)
    },

    shortDate() {
      return shortDateFormat.format(this.date)
    },

    excerpt() {
      return (
        this.post.excerpt || this.post.body.split('<!-- READMORE -->', 1)[0]
      )
    },
  },
}
</script>

<style scoped>
h2 {
  font-size: var(--fs-2);
  line-height: var(--fs-2);
}

time {
  white-space: nowrap;
}
</style>
