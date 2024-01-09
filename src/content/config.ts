import {z, defineCollection} from 'astro:content'

const wordsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    section: z.enum(['code', 'arts', 'both']),
    tags: z.union([z.array(z.string()).optional(), z.null()]),
    image: z.string().optional(),
    status: z.enum(['published', 'draft']).optional(),
  }),
})

export const collections = {
  words: wordsCollection,
}
