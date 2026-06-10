import { useEffect, useState } from 'react'

export type SessionUser = {
  id: string
  name?: string | null
  email: string
  image?: string | null
  createdAt?: string
}

type SessionData = { user: SessionUser } | null

// ─── fetch helper ────────────────────────────────────────────────────────────
async function fetchSession(): Promise<SessionData> {
  try {
    const res = await fetch('/api/auth/session', { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    return json.user ? { user: json.user } : null
  } catch {
    return null
  }
}

// ─── useSession ──────────────────────────────────────────────────────────────
export const useSession = (): { data: SessionData; isPending: boolean; reload: () => void } => {
  const [data, setData] = useState<SessionData>(null)
  const [isPending, setIsPending] = useState(true)

  const load = () => {
    setIsPending(true)
    fetchSession().then((session) => {
      setData(session)
      setIsPending(false)
    })
  }

  useEffect(() => {
    load()
    // Re-fetch setiap kali window mendapat fokus (misal: kembali dari tab lain)
    window.addEventListener('focus', load)
    return () => window.removeEventListener('focus', load)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, isPending, reload: load }
}

// ─── auth helpers ─────────────────────────────────────────────────────────────
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
