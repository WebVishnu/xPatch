import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Free Landing Page By Xpatch',
  description: 'We offer free landing page design and development for businesses of all sizes. Our team of experts will work with you to create a landing page that meets your specific needs and goals.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className=' overflow-x-hidden'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
