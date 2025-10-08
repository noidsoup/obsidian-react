import { readNotesFromDirectory, parseNote } from '../noteReader'
import fs from 'fs'
import path from 'path'

// Mock fs module
jest.mock('fs')

describe('noteReader', () => {
  describe('readNotesFromDirectory', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('should return empty array when directory does not exist', () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(false)
      
      const result = readNotesFromDirectory('/fake/path')
      
      expect(result).toEqual([])
      expect(fs.existsSync).toHaveBeenCalledWith('/fake/path')
    })

    test('should return empty array when directory has no markdown files', () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readdirSync as jest.Mock).mockReturnValue(['image.png', 'doc.pdf'])
      
      const result = readNotesFromDirectory('/fake/path')
      
      expect(result).toEqual([])
    })

    test('should return array of markdown file paths', () => {
      const mockPath = '/fake/path'
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readdirSync as jest.Mock).mockReturnValue([
        'note1.md',
        'note2.md',
        'image.png'
      ])
      
      const result = readNotesFromDirectory(mockPath)
      
      expect(result).toEqual([
        path.join(mockPath, 'note1.md'),
        path.join(mockPath, 'note2.md')
      ])
    })
  })

  describe('parseNote', () => {
    test('should parse markdown file with frontmatter', () => {
      const filePath = '/path/to/note.md'
      const fileContent = `---
title: Test Note
status: active
tags: [test, demo]
---

This is the content.`

      ;(fs.readFileSync as jest.Mock).mockReturnValue(fileContent)
      
      const result = parseNote(filePath)
      
      expect(result).toEqual({
        slug: 'note',
        title: 'Test Note',
        properties: {
          title: 'Test Note',
          status: 'active',
          tags: ['test', 'demo']
        },
        content: 'This is the content.'
      })
    })

    test('should use filename as title when no title in frontmatter', () => {
      const filePath = '/path/to/my-note.md'
      const fileContent = `---
status: active
---

Content here.`

      ;(fs.readFileSync as jest.Mock).mockReturnValue(fileContent)
      
      const result = parseNote(filePath)
      
      expect(result.title).toBe('my-note')
      expect(result.slug).toBe('my-note')
    })

    test('should handle markdown without frontmatter', () => {
      const filePath = '/path/to/simple.md'
      const fileContent = 'Just plain markdown content.'

      ;(fs.readFileSync as jest.Mock).mockReturnValue(fileContent)
      
      const result = parseNote(filePath)
      
      expect(result).toEqual({
        slug: 'simple',
        title: 'simple',
        properties: {},
        content: 'Just plain markdown content.'
      })
    })

    test('should trim whitespace from content', () => {
      const filePath = '/path/to/note.md'
      const fileContent = `---
title: Test
---

  Content with spaces  
  `

      ;(fs.readFileSync as jest.Mock).mockReturnValue(fileContent)
      
      const result = parseNote(filePath)
      
      expect(result.content).toBe('Content with spaces')
    })
  })
})


