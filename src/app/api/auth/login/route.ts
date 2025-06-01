import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ message: 'Faltan email o password' }, { status: 400 })
    }

    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Usuarios/login`
    console.log('🔗 Conectando a backend en:', fullUrl)

    const apiRes = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const raw = await apiRes.text()
    console.log('🧪 Respuesta cruda:', raw)

    let data: any = {}
    try {
      data = JSON.parse(raw)
    } catch {
      console.warn('⚠️ Respuesta no es JSON válido:', raw)
      data = { raw }
    }

    if (!apiRes.ok || !data.token) {
      return NextResponse.json({ message: data.message || 'Credenciales inválidas' }, { status: 401 })
    }

    (await cookies()).set('token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('❌ Error en login:', err)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
