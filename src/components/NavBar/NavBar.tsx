'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Revisa si existe la cookie manualmente desde JS (no es tan seguro como el server, pero útil para UI)
    const hasCookie = document.cookie.includes('token=')
    setIsLoggedIn(hasCookie)
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    })

    router.push('/login')
  }

  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontWeight: 'bold' }}>🛒 Mi E-commerce</span>

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
