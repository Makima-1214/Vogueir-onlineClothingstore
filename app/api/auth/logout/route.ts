import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'

export async function POST() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session-token')?.value
  if (sessionToken) {
    await prisma.session.deleteMany({ where: { sessionToken } })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set({
    name: 'session-token',
    value: '',
    path: '/',
    maxAge: 0,
  })

  return response
}
