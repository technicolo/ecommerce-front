'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './cssComponents/NavBar.module.css'

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
    <nav className={styles.navbar}>
      <div className={styles.logo}>🛒 Mi E-commerce</div>
      <div className={styles.navLinks}>
        <Link href="/productos" className={styles.link}>Productos</Link>
        <Link href="/carrito" className={styles.link}>Carrito</Link>
        <Link href="/perfil" className={styles.link}>Perfil</Link>
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} className={styles.logoutBtn}>Cerrar sesión</button>
        ) : (
          <button onClick={() => router.push('/login')} className={styles.loginBtn}>Iniciar sesión</button>
        )}
      </div>
    </nav>
  )
}
