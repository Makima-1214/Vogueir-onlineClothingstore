// Simplified auth client for demo purposes

type SessionData = {
  user: {
    id: string
    name?: string | null
    email: string
    image?: string | null
  }
} | null

export const useSession = (): { data: SessionData; isPending: boolean } => {
  return { data: null, isPending: false }
}

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  // Mock sign in
  return { success: true }
}

export const signUp = async ({ email, password, name }: { email: string; password: string; name: string }) => {
  // Mock sign up
  return { success: true }
}

export const signOut = async () => {
  // Mock sign out
  return { success: true }
}

export const authClient = {
  signIn: { email: signIn },
  signUp: { email: signUp },
  signOut,
}

