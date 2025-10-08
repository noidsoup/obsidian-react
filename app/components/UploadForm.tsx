'use client'

import { useState } from 'react'
import { Note } from '@/lib/noteReader'

interface UploadFormProps {
  onNotesLoaded: (notes: Note[]) => void
}

export default function UploadForm({ onNotesLoaded }: UploadFormProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setUploading(true)

    const formData = new FormData(e.currentTarget)
    const file = formData.get('file') as File

    if (!file) {
      setError('Please select a file')
      setUploading(false)
      return
    }

    if (!file.name.endsWith('.zip')) {
      setError('Please upload a .zip file')
      setUploading(false)
      return
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      onNotesLoaded(data.notes)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="upload-form">
      <h2>Upload Your Obsidian Vault</h2>
      <p>Export your vault as a .zip file and upload it here to view your notes.</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          accept=".zip"
          disabled={uploading}
          required
        />
        
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Vault'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  )
}

