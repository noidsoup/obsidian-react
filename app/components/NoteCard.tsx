import { Note } from '@/lib/noteReader'

interface NoteCardProps {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const displayContent = note.content.length > 200 
    ? note.content.substring(0, 200) + '...'
    : note.content

  // Filter out title from properties to avoid duplication
  const displayProperties = Object.entries(note.properties)
    .filter(([key]) => key !== 'title')

  return (
    <div className="note-card">
      <h2 className="note-title">{note.title}</h2>
      
      {displayProperties.length > 0 && (
        <div className="note-properties">
          {displayProperties.map(([key, value]) => (
            <div key={key} className="property">
              <span className="property-key">{key}:</span>
              <span className="property-value">
                {Array.isArray(value) ? value.join(', ') : String(value)}
              </span>
            </div>
          ))}
        </div>
      )}
      
      {note.content && (
        <div className="note-content">
          {displayContent}
        </div>
      )}
    </div>
  )
}


