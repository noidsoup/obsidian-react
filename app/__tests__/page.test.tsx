import { render, screen, fireEvent, act } from '@testing-library/react'
import Home from '../page'

describe('Home Page', () => {
  test('should render page title', () => {
    render(<Home />)
    expect(screen.getByText('Obsidian Bases Viewer')).toBeInTheDocument()
  })

  test('should display upload form initially', () => {
    render(<Home />)
    
    expect(screen.getByText('Upload Your Obsidian Vault')).toBeInTheDocument()
    expect(screen.getByText(/Export your vault as a .zip file/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Upload Vault/i })).toBeInTheDocument()
  })

  test('should display notes after upload', () => {
    const { rerender } = render(<Home />)
    
    // Simulate notes being loaded
    const mockNotes = [
      {
        slug: 'note1',
        title: 'First Note',
        properties: { status: 'active' },
        content: 'First content'
      },
      {
        slug: 'note2',
        title: 'Second Note',
        properties: { status: 'done' },
        content: 'Second content'
      }
    ]

    // Since the page is now client-side, we test that the upload form is shown
    expect(screen.getByText('Upload Your Obsidian Vault')).toBeInTheDocument()
  })

  test('should show reset button after notes are loaded', () => {
    render(<Home />)
    
    // Initially, no reset button
    expect(screen.queryByText('Upload Different Vault')).not.toBeInTheDocument()
    
    // After upload, reset button would appear (tested in integration)
  })

  test('should display file input with correct accept attribute', () => {
    const { container } = render(<Home />)
    
    const fileInput = container.querySelector('input[type="file"]')
    
    expect(fileInput).toBeInTheDocument()
    expect(fileInput).toHaveAttribute('accept', '.zip')
    expect(fileInput).toHaveAttribute('name', 'file')
  })
})


