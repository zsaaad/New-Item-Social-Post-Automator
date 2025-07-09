import type { Metadata } from 'next'
import { manrope } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Strategic Post Generator',
  description: 'Transform your new products into compelling social media campaigns using proven bestseller strategies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>{children}</body>
    </html>
  )
} 