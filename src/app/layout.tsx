// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'AGG USA Tickets',
  description: 'AGG USA Tickets — Official Ticketing Platform for Aesthetic Group Gymnastics Events',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}