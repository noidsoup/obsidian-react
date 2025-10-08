import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home Page', () => {
  test('should render page title', () => {
    render(<Home />)
    expect(screen.getByText('Obsidian Bases Viewer')).toBeInTheDocument()
  })

  test('should display empty state when no notes are found', () => {
    render(<Home />)
    
    expect(screen.getByText('No notes found.')).toBeInTheDocument()
    expect(screen.getByText(/npm run import-vault/)).toBeInTheDocument()
  })

  test('should display instruction code snippet', () => {
    render(<Home />)
    
    const codeElement = screen.getByText('npm run import-vault path/to/vault.zip')
    expect(codeElement).toBeInTheDocument()
    expect(codeElement.tagName).toBe('CODE')
  })
})


