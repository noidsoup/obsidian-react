import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Note {
  slug: string
  title: string
  properties: Record<string, any>
  content: string
}

export function readNotesFromDirectory(directoryPath: string): string[] {
  if (!fs.existsSync(directoryPath)) {
    return []
  }

  const files = fs.readdirSync(directoryPath)
  const markdownFiles = files.filter(file => file.endsWith('.md'))
  
  return markdownFiles.map(file => path.join(directoryPath, file))
}

export function parseNote(filePath: string): Note {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  
  const filename = path.basename(filePath, '.md')
  const title = data.title || filename
  
  return {
    slug: filename,
    title,
    properties: data,
    content: content.trim()
  }
}


