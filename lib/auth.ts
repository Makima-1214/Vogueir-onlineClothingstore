import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'crypto'
import { prisma } from './db'

export const SESSION_COOKIE_NAME = 'session-token'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

const PASSWORD_SALT_BYTES = 16
const PASSWORD_KEY_LEN = 64

export function hashPassword(password: string) {
  const salt = randomBytes(PASSWORD_SALT_BYTES).toString('hex')
  const derivedKey = scryptSync(password, salt, PASSWORD_KEY_LEN)
  return `${salt}:${derivedKey.toString('hex')}`
}

export function verifyPassword(password: string, hashedPassword: string) {
  if (!hashedPassword) return false
  const [salt, key] = hashedPassword.split(':')
  if (!salt || !key) return false
  const derivedKey = scryptSync(password, salt, PASSWORD_KEY_LEN)
  return timingSafeEqual(derivedKey, Buffer.from(key, 'hex'))
}

export async function createUserSession(userId: string) {
  const sessionToken = randomBytes(48).toString('hex')
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000)

  return prisma.session.create({
    data: {
      id: randomUUID(),
      sessionToken,
      userId,
      expiresAt,
    },
  })
}

export async function getUserBySessionToken(sessionToken: string) {
  const session = await prisma.session.findFirst({
    where: {
      sessionToken,
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
      user: true,
    },
  })

  return session?.user ?? null
}

