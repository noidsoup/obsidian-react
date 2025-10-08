import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { extractMarkdownFromZip } from '@/lib/zipExtractor'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }
    
    // Validate file type
    if (!file.name.endsWith('.zip')) {
      return NextResponse.json(
        { error: 'Only .zip files are allowed' },
        { status: 400 }
      )
    }
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }
    
    // Save uploaded file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `upload-${Date.now()}.zip`
    const filepath = path.join(uploadsDir, filename)
    
    await writeFile(filepath, buffer)
    
    // Extract notes from zip
    const notes = await extractMarkdownFromZip(filepath)
    
    // Store notes in session/memory (for now)
    // In production, you'd use a database or session store
    
    return NextResponse.json({
      success: true,
      notesCount: notes.length,
      notes: notes
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    )
  }
}

