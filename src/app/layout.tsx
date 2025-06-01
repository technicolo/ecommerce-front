import Navbar from '@/components/NavBar/NavBar'
import './globals.css'

export const metadata = {
  title: 'E-commerce App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
