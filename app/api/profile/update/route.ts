import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getUserBySessionToken, hashPassword } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('session-token')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Tidak terautentikasi.' }, { status: 401 })
    }

    const user = await getUserBySessionToken(sessionToken)
    if (!user) {
      return NextResponse.json({ error: 'Pengguna tidak ditemukan.' }, { status: 401 })
    }

    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Request body tidak valid.' }, { status: 400 })
    }

    const { name, password, newPassword, image } = body

    // Prepare update data
    const updateData: Record<string, any> = {}

    if (typeof name === 'string') {
      const trimmedName = name.trim()
      if (trimmedName) {
        updateData.name = trimmedName
      }
    }

    if (typeof image === 'string') {
      updateData.image = image
    }

    // Handle password change if requested
    if (password && newPassword) {
      // Import verifyPassword from @/lib/auth
      const { verifyPassword } = require('@/lib/auth')
      
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id }
      })

      if (!dbUser || !dbUser.password || !verifyPassword(password, dbUser.password)) {
        return NextResponse.json({ error: 'Password saat ini salah.' }, { status: 400 })
      }

      if (newPassword.length < 8) {
        return NextResponse.json({ error: 'Password baru minimal 8 karakter.' }, { status: 400 })
      }

      updateData.password = hashPassword(newPassword)
    }

    // Perform database update
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true
      }
    })

    return NextResponse.json({ success: true, user: updatedUser })
  } catch (err: any) {
    console.error('Profile update error:', err)
    return NextResponse.json({ error: 'Gagal memperbarui profil. Silakan coba lagi.' }, { status: 500 })
  }
}
