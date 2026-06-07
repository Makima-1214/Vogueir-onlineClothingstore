import { NextResponse } from 'next/server'
import { verifyPassword, createUserSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!email || !password) {
    return NextResponse.json({ error: 'Email dan password wajib diisi.' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password || !verifyPassword(password, user.password)) {
    return NextResponse.json({ error: 'Email atau password salah.' }, { status: 401 })
  }

  const session = await createUserSession(user.id)
  const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt } })

  response.cookies.set({
    name: 'session-token',
    value: session.sessionToken,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
  })

  return response
}
