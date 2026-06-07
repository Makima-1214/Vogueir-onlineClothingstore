import { useEffect, useState } from 'react'

type SessionData = {
  user: {
    id: string
    name?: string | null
    email: string
    image?: string | null
    createdAt?: string
  }
} | null

export const useSession = (): { data: SessionData; isPending: boolean } => {
  const [data, setData] = useState<SessionData>(null)
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetch('/api/auth/session', { cache: 'no-store' })
      .then(async (res) => {
        const response = await res.json()
        if (!cancelled) {
          setData(response.user ?? null)
          setIsPending(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(null)
          setIsPending(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { data, isPending }
}

async function fetchAuth(path: string, body: Record<string, unknown>) {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data?.error || 'Terjadi kesalahan autentikasi.')
  }
  return data
}

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  const data = await fetchAuth('/api/auth/login', { email, password })
  return { success: true, user: data.user }
}

export const signUp = async ({ email, password, name }: { email: string; password: string; name: string }) => {
  const data = await fetchAuth('/api/auth/register', { email, password, name })
  return { success: true, user: data.user }
}

export const signOut = async () => {
  const response = await fetch('/api/auth/logout', { method: 'POST' })
  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.error || 'Gagal keluar.')
  }
  return { success: true }
}

export const authClient = {
  signIn: { email: signIn },
  signUp: { email: signUp },
  signOut,
}

