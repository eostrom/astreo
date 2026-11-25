import {glob} from 'astro/loaders'
import {defineCollection} from 'astro:content'
import {z} from 'astro/zod'

const wordsCollection = defineCollection({
  loader: glob({pattern: '**/*.{md,mdx}', base: './src/content/words'}),
  schema: z.object({
    title: z.string(),
    description: z.optional(z.string()),
    date: z.string(),
    section: z.enum(['code', 'arts', 'both']),
    tags: z.union([z.array(z.string()).optional(), z.null()]),
    image: z.string().optional(),
    status: z.enum(['published', 'draft']).optional(),
  }),
})

const showsCollection = defineCollection({
  loader: glob({pattern: '**/*.md', base: './src/content/shows'}),
  schema: z.object({
    when: z.string(),
    where: z.string(),
    whereUrl: z.string().optional(),
    firstDate: z.date(),
    lastDate: z.date(),
  }),
})

export const collections = {
  words: wordsCollection,
  shows: showsCollection,
}
