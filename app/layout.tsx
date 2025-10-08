import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Obsidian Bases Viewer',
  description: 'View Obsidian notes and bases',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


