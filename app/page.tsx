import path from 'path'
import { getAllNotes } from '@/lib/notes'
import NoteCard from './components/NoteCard'

export default function Home() {
  const vaultPath = path.join(process.cwd(), 'vault')
  const notes = getAllNotes(vaultPath)

  return (
    <main>
      <h1>Obsidian Bases Viewer</h1>
      
      {notes.length === 0 ? (
        <div className="empty-state">
          <p>No notes found.</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
            Use <code>npm run import-vault path/to/vault.zip</code> to import notes.
          </p>
        </div>
      ) : (
        <>
          <div className="note-count">
            <p>📚 {notes.length} notes</p>
          </div>
          <div>
            {notes.map(note => (
              <NoteCard key={note.slug} note={note} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}

