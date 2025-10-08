import AdmZip from 'adm-zip'
import matter from 'gray-matter'
import path from 'path'
import { Note } from './noteReader'

/**
 * Check if a file should be extracted based on path and extension
 */
export function isMarkdownFile(filePath: string): boolean {
  const pathParts = filePath.split(path.sep)
  
  // Skip hidden files/folders
  if (pathParts.some(part => part.startsWith('.'))) {
    return false
  }
  
  // Skip __MACOSX folder (Mac zip artifacts)
  if (filePath.includes('__MACOSX')) {
    return false
  }
  
  // Only process markdown files
  if (!filePath.endsWith('.md')) {
    return false
  }
  
  return true
}

/**
 * Extract all markdown notes from a zip file
 */
export async function extractMarkdownFromZip(zipPath: string): Promise<Note[]> {
  try {
    const zip = new AdmZip(zipPath)
    const zipEntries = zip.getEntries()
    const notes: Note[] = []
    
    for (const entry of zipEntries) {
      // Skip directories
      if (entry.isDirectory) {
        continue
      }
      
      // Skip non-markdown files
      if (!isMarkdownFile(entry.entryName)) {
        continue
      }
      
      // Extract and parse markdown
      const buffer = entry.getData()
      const content = buffer.toString('utf8')
      const { data, content: markdown } = matter(content)
      
      // Get filename without extension
      const filename = path.basename(entry.entryName, '.md')
      
      const note: Note = {
        slug: filename,
        title: data.title || filename,
        properties: data,
        content: markdown.trim()
      }
      
      notes.push(note)
    }
    
    return notes
  } catch (error) {
    throw new Error(`Failed to extract zip file: ${error}`)
  }
}

