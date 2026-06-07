import { NextResponse } from 'next/server'
import { hashPassword, createUserSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body?.password === 'string' ? body.password : ''
  const name = typeof body?.name === 'string' ? body.name.trim() : ''

  if (!email || !password) {
    return NextResponse.json({ error: 'Email dan password wajib diisi.' }, { status: 400 })
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'Password harus minimal 8 karakter.' }, { status: 400 })
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return NextResponse.json({ error: 'Email sudah terdaftar.' }, { status: 400 })
  }

  const user = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name: name || undefined,
      email,
      password: hashPassword(password),
    },
  })

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
