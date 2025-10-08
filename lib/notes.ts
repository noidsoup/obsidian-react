import { readNotesFromDirectory, parseNote, Note } from './noteReader'

export function getAllNotes(vaultPath: string): Note[] {
  const filePaths = readNotesFromDirectory(vaultPath)
  return filePaths.map(filePath => parseNote(filePath))
}


