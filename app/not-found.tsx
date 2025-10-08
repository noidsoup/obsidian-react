export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p style={{ color: '#888', margin: '1rem 0' }}>
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        style={{
          color: '#7c3aed',
          textDecoration: 'underline'
        }}
      >
        Return Home
      </a>
    </div>
  )
}


