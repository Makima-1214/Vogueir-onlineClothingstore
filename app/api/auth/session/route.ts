import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getUserBySessionToken } from '@/lib/auth'

export async function GET() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session-token')?.value
  if (!sessionToken) {
    return NextResponse.json({ user: null })
  }

  const user = await getUserBySessionToken(sessionToken)
  if (!user) {
    return NextResponse.json({ user: null })
  }

  return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, image: user.image, createdAt: user.createdAt } })
}
