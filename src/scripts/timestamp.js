import fs from 'node:fs'
import path from 'node:path'
import {format} from 'date-fns'

const WORDS_DIR = 'src/content/words'

function getTimestamp() {
  return format(new Date(), "yyyy-MM-dd'T'HH:mm:ssXX")
}

function getDatestamp() {
  return format(new Date(), 'yyyy-MM-dd')
}

async function main() {
  let filePath = process.argv[2]
  if (!filePath) {
    console.error('Usage: yarn timestamp <path-to-file>')
    process.exit(1)
  }

  // (if given a bare filename, prepends `src/content/words`)
  if (!filePath.includes(path.sep) && !fs.existsSync(filePath)) {
    filePath = path.join(WORDS_DIR, filePath)
  }

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    process.exit(1)
  }

  const content = fs.readFileSync(filePath, 'utf8')
  const timestamp = getTimestamp()
  const datestamp = getDatestamp()

  // updates the `date` frontmatter metadata to the current date, time, and time zone
  // matches "date: ..." even if it's on the first line or has trailing spaces
  const updatedContent = content.replace(/^date:\s*.*$/m, `date: ${timestamp}`)

  if (content === updatedContent && !content.includes('date:')) {
    // If date didn't exist, we might want to add it?
    // But the prompt says "updates", implying it should exist.
    // Let's check if it has frontmatter.
    if (content.startsWith('---')) {
      const lines = content.split('\n')
      lines.splice(1, 0, `date: ${timestamp}`)
      fs.writeFileSync(filePath, lines.join('\n'))
    } else {
      fs.writeFileSync(filePath, updatedContent)
    }
  } else {
    fs.writeFileSync(filePath, updatedContent)
  }

  // updates the filename to the current date in the user's time zone
  const dir = path.dirname(filePath)
  const ext = path.extname(filePath)
  let name = path.basename(filePath, ext)

  // Remove existing date prefix if it matches YYYY-MM-DD
  const datePrefixRegex = /^\d{4}-\d{2}-\d{2}-/
  if (datePrefixRegex.test(name)) {
    name = name.replace(datePrefixRegex, '')
  }

  const newFilename = `${datestamp}-${name}${ext}`
  const newPath = path.join(dir, newFilename)

  if (filePath !== newPath) {
    fs.renameSync(filePath, newPath)
    console.log(`Updated and renamed to: ${newPath}`)
  } else {
    console.log(`Updated: ${filePath}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
