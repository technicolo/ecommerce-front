import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const token = (await cookies()).get('token')?.value

  if (!token) {
    redirect('/login')
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    redirect('/login')
  }

  const user = await res.json()

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Bienvenido, {user.name}</h1>
    </main>
  )
}
