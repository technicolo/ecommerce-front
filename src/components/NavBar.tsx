'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  isLoggedIn: boolean
}

export default function Navbar({ isLoggedIn }: Props) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    })

    router.push('/login')
  }

  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontWeight: 'bold' }}>🛒 Mi E-commerce</span>
      <Link href="/productos">Productos</Link>
      <Link href="/carrito">Carrito</Link>
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>
            Cerrar sesión
          </button>
        ) : (
          <button onClick={() => router.push('/login')}>Iniciar sesión</button>
        )}
      </div>
    </nav>
  )
}
