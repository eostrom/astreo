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

const showsCollection = defineCollection({
  type: 'content',
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
