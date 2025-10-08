'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Something went wrong!</h2>
      <p style={{ color: '#888', margin: '1rem 0' }}>
        {error.message || 'An error occurred while loading this page.'}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.5rem 1rem',
          background: '#7c3aed',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Try again
      </button>
    </div>
  )
}


