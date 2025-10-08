import { render, screen } from '@testing-library/react'
import NoteCard from '../NoteCard'

describe('NoteCard', () => {
  test('should render note title', () => {
    const note = {
      slug: 'test',
      title: 'Test Note',
      properties: {},
      content: 'Test content'
    }

    render(<NoteCard note={note} />)
    
    expect(screen.getByText('Test Note')).toBeInTheDocument()
  })

  test('should render note content', () => {
    const note = {
      slug: 'test',
      title: 'Test',
      properties: {},
      content: 'This is the content'
    }

    render(<NoteCard note={note} />)
    
    expect(screen.getByText('This is the content')).toBeInTheDocument()
  })

  test('should truncate long content at 200 characters', () => {
    const longContent = 'a'.repeat(250)
    const note = {
      slug: 'test',
      title: 'Test',
      properties: {},
      content: longContent
    }

    render(<NoteCard note={note} />)
    
    const contentElement = screen.getByText(/^a+\.\.\./)
    expect(contentElement.textContent).toHaveLength(203) // 200 chars + '...'
  })

  test('should not truncate short content', () => {
    const shortContent = 'Short content'
    const note = {
      slug: 'test',
      title: 'Test',
      properties: {},
      content: shortContent
    }

    render(<NoteCard note={note} />)
    
    expect(screen.getByText(shortContent)).toBeInTheDocument()
    expect(screen.queryByText('...')).not.toBeInTheDocument()
  })

  test('should render properties', () => {
    const note = {
      slug: 'test',
      title: 'Test',
      properties: {
        status: 'active',
        priority: 'high'
      },
      content: 'Content'
    }

    render(<NoteCard note={note} />)
    
    expect(screen.getByText('status:')).toBeInTheDocument()
    expect(screen.getByText('active')).toBeInTheDocument()
    expect(screen.getByText('priority:')).toBeInTheDocument()
    expect(screen.getByText('high')).toBeInTheDocument()
  })

  test('should render array properties as comma-separated list', () => {
    const note = {
      slug: 'test',
      title: 'Test',
      properties: {
        tags: ['work', 'important', 'urgent']
      },
      content: 'Content'
    }

    render(<NoteCard note={note} />)
    
    expect(screen.getByText('tags:')).toBeInTheDocument()
    expect(screen.getByText('work, important, urgent')).toBeInTheDocument()
  })

  test('should not render properties section when no properties', () => {
    const note = {
      slug: 'test',
      title: 'Test',
      properties: {},
      content: 'Content'
    }

    const { container } = render(<NoteCard note={note} />)
    
    expect(container.querySelector('.note-properties')).not.toBeInTheDocument()
  })

  test('should not render title property as duplicate', () => {
    const note = {
      slug: 'test',
      title: 'Test Note',
      properties: {
        title: 'Test Note',
        status: 'active'
      },
      content: 'Content'
    }

    render(<NoteCard note={note} />)
    
    // Title should appear once as heading
    const titleElements = screen.getAllByText('Test Note')
    expect(titleElements).toHaveLength(1)
    
    // But status should still show
    expect(screen.getByText('status:')).toBeInTheDocument()
  })

  test('should handle empty content', () => {
    const note = {
      slug: 'test',
      title: 'Test',
      properties: {},
      content: ''
    }

    render(<NoteCard note={note} />)
    
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})


