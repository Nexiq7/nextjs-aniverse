import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar/Navbar'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Aniverse',
  description: 'Explore the Aniverse',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
