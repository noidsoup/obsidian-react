import { getAllNotes } from '../notes'
import * as noteReader from '../noteReader'

jest.mock('../noteReader')

describe('notes', () => {
  describe('getAllNotes', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('should return empty array when no markdown files found', () => {
      ;(noteReader.readNotesFromDirectory as jest.Mock).mockReturnValue([])
      
      const result = getAllNotes('/vault')
      
      expect(result).toEqual([])
      expect(noteReader.readNotesFromDirectory).toHaveBeenCalledWith('/vault')
    })

    test('should parse all markdown files and return notes', () => {
      const mockFilePaths = ['/vault/note1.md', '/vault/note2.md']
      const mockNotes = [
        {
          slug: 'note1',
          title: 'Note 1',
          properties: { status: 'active' },
          content: 'Content 1'
        },
        {
          slug: 'note2',
          title: 'Note 2',
          properties: { status: 'done' },
          content: 'Content 2'
        }
      ]

      ;(noteReader.readNotesFromDirectory as jest.Mock).mockReturnValue(mockFilePaths)
      ;(noteReader.parseNote as jest.Mock)
        .mockReturnValueOnce(mockNotes[0])
        .mockReturnValueOnce(mockNotes[1])
      
      const result = getAllNotes('/vault')
      
      expect(result).toEqual(mockNotes)
      expect(noteReader.parseNote).toHaveBeenCalledTimes(2)
      expect(noteReader.parseNote).toHaveBeenCalledWith('/vault/note1.md')
      expect(noteReader.parseNote).toHaveBeenCalledWith('/vault/note2.md')
    })

    test('should handle single note', () => {
      const mockNote = {
        slug: 'single',
        title: 'Single Note',
        properties: {},
        content: 'Single content'
      }

      ;(noteReader.readNotesFromDirectory as jest.Mock).mockReturnValue(['/vault/single.md'])
      ;(noteReader.parseNote as jest.Mock).mockReturnValue(mockNote)
      
      const result = getAllNotes('/vault')
      
      expect(result).toEqual([mockNote])
    })
  })
})


