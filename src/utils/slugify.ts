// From https://jasonwatmore.com/vanilla-js-slugify-a-string-in-javascript

export function slugify(input: string) {
  if (!input) return ''

  // make lower case and trim
  return (
    input
      .toLowerCase()

      // remove accents from characters
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

      // replace invalid chars with spaces
      .replace(/[^a-z0-9\s-]/g, ' ')
      .trim()

      // replace multiple spaces or hyphens with a single hyphen
      .replace(/[\s-]+/g, '-')
  )
}
