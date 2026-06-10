import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'crypto'
import { prisma } from './db'

export const SESSION_COOKIE_NAME = 'session-token'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

const PASSWORD_SALT_BYTES = 16
const PASSWORD_KEY_LEN = 64

// Scrypt params must match better-auth (@better-auth/utils/password):
// N: 16384, r: 16, p: 1 — the default Node.js scrypt uses r: 8, which causes mismatch.
const SCRYPT_PARAMS = { N: 16384, r: 16, p: 1, maxmem: 128 * 16384 * 16 * 2 }

export function hashPassword(password: string) {
  const salt = randomBytes(PASSWORD_SALT_BYTES).toString('hex')
  const derivedKey = scryptSync(password.normalize('NFKC'), salt, PASSWORD_KEY_LEN, SCRYPT_PARAMS)
  return `${salt}:${derivedKey.toString('hex')}`
}

export function verifyPassword(password: string, hashedPassword: string) {
  if (!hashedPassword) return false

  // Support better-auth format: "scrypt:<salt>:<hash>"
  // and custom format: "<salt>:<hash>"
  let salt: string
  let key: string

  const parts = hashedPassword.split(':')
  if (parts.length === 3 && parts[0] === 'scrypt') {
    // better-auth format: scrypt:<salt>:<hash>
    salt = parts[1]
    key = parts[2]
  } else if (parts.length === 2) {
    // custom format: <salt>:<hash>
    salt = parts[0]
    key = parts[1]
  } else {
    return false
  }

  if (!salt || !key) return false

  try {
    const derivedKey = scryptSync(password.normalize('NFKC'), salt, PASSWORD_KEY_LEN, SCRYPT_PARAMS)
    const keyBuffer = Buffer.from(key, 'hex')
    if (derivedKey.length !== keyBuffer.length) return false
    return timingSafeEqual(derivedKey, keyBuffer)
  } catch {
    return false
  }
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

