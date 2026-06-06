'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Mode = 'login' | 'signup'

// ─── IMAGES ───────────────────────────────────────────────────────────────────
const LOGIN_IMG =
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop'
const SIGNUP_IMG =
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&auto=format&fit=crop'

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function AuthPanel({ initialMode = 'login' }: { initialMode?: Mode }) {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>(initialMode)
  const [animating, setAnimating] = useState(false)

  // form states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // ── switch with animation ──────────────────────────────────────────────────
  function switchMode(next: Mode) {
    if (next === mode || animating) return
    setAnimating(true)
    setError('')
    // after CSS transition (500ms), flip the mode
    setTimeout(() => {
      setMode(next)
      setAnimating(false)
    }, 480)
  }

  // ── submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await authClient.signIn.email({ email, password })
      } else {
        await authClient.signUp.email({ email, password, name })
      }
      router.push('/')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  // ── derived ────────────────────────────────────────────────────────────────
  // When login: image is on RIGHT  → panel translateX(100%) when switching to signup
  // When signup: image is on LEFT  → panel translateX(-100%) when switching to login
  //
  // We track "visual" mode (what's rendered) vs pending animation direction.
  // Simpler: use a single boolean `isLogin` that flips AFTER the transition.
  const isLogin = mode === 'login'

  return (
    <div
      className="h-screen w-screen overflow-hidden flex"
      style={{ backgroundColor: '#faf9f8', fontFamily: "'Inter', sans-serif", color: '#1a1a1a' }}
    >
      {/*
        ┌──────────────────────────────────────────────────────────────────────┐
        │  Two-panel trick:                                                    │
        │  - A single container with position:relative, width:200%            │
        │  - Left half = login form  |  Right half = signup form              │
        │  - The image overlay slides on top with CSS transform               │
        └──────────────────────────────────────────────────────────────────────┘
      */}

      {/* ── FORMS WRAPPER ──────────────────────────────────────────────────── */}
      <div className="relative flex w-full h-full">

        {/* LOGIN FORM — always left */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-center px-8 md:px-16 transition-opacity duration-500"
          style={{
            opacity: isLogin ? 1 : 0,
            pointerEvents: isLogin ? 'auto' : 'none',
            zIndex: 1,
          }}
        >
          <FormLogin
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            error={isLogin ? error : ''}
            loading={loading && isLogin}
            onSubmit={handleSubmit}
            onSwitch={() => switchMode('signup')}
          />
        </div>

        {/* SIGNUP FORM — always right */}
        <div
          className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-center px-8 md:px-16 transition-opacity duration-500"
          style={{
            opacity: !isLogin ? 1 : 0,
            pointerEvents: !isLogin ? 'auto' : 'none',
            zIndex: 1,
          }}
        >
          <FormSignUp
            name={name} setName={setName}
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            error={!isLogin ? error : ''}
            loading={loading && !isLogin}
            onSubmit={handleSubmit}
            onSwitch={() => switchMode('login')}
          />
        </div>

        {/* ── IMAGE PANEL — slides left/right ──────────────────────────────── */}
        <div
          className="absolute inset-y-0 w-1/2 overflow-hidden"
          style={{
            // login  → image on right  → translateX(100%)  = starting at right half
            // signup → image on left   → translateX(0%)    = starting at left half
            transform: isLogin ? 'translateX(100%)' : 'translateX(0%)',
            transition: animating
              ? 'transform 500ms cubic-bezier(0.77, 0, 0.175, 1)'
              : 'transform 500ms cubic-bezier(0.77, 0, 0.175, 1)',
            zIndex: 10,
          }}
        >
          {/* Inner image also cross-fades between the two photos */}
          <div className="relative w-full h-full">
            {/* Login image */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                backgroundImage: `url('${LOGIN_IMG}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: isLogin ? 1 : 0,
              }}
            />
            {/* Signup image */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                backgroundImage: `url('${SIGNUP_IMG}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: !isLogin ? 1 : 0,
              }}
            />
            {/* Overlay gradient + branding */}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col justify-end p-10">
              <Link href="/" className="flex flex-col leading-none select-none mb-auto mt-8">
                <span
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-2xl font-semibold tracking-[4px] uppercase text-white"
                >
                  VOGUEIR
                </span>
                <span className="text-[0.45rem] tracking-[5px] uppercase text-white/70 mt-[-2px]">
                  FASHION
                </span>
              </Link>
              <div>
                <p
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-white text-3xl font-normal leading-[1.2] mb-3"
                >
                  {isLogin ? 'Selamat\nDatang Kembali' : 'Bergabung\nBersama Kami'}
                </p>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                  {isLogin
                    ? 'Masuk dan temukan koleksi terbaru yang menunggu kamu.'
                    : 'Buat akun dan nikmati akses eksklusif ke koleksi fashion terbaik.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── LOGIN FORM ───────────────────────────────────────────────────────────────
function FormLogin({
  email, setEmail, password, setPassword,
  error, loading, onSubmit, onSwitch,
}: {
  email: string; setEmail: (v: string) => void
  password: string; setPassword: (v: string) => void
  error: string; loading: boolean
  onSubmit: (e: React.FormEvent) => void
  onSwitch: () => void
}) {
  return (
    <div className="w-full max-w-sm">
      <p className="text-[0.7rem] font-medium uppercase tracking-[2px] mb-3 text-[#555]">
        Selamat Datang Kembali
      </p>
      <h1
        style={{ fontFamily: "'Playfair Display', serif" }}
        className="text-3xl font-normal mb-1"
      >
        Masuk
      </h1>
      <p className="text-sm text-[#555] mb-7">
        Akses akun Anda untuk melihat pesanan dan item tersimpan.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="anda@email.com" />
        <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

        {error && <ErrorBox msg={error} />}

        <SubmitBtn loading={loading} label="Masuk" loadingLabel="Sedang masuk..." />
      </form>

      <p className="text-center text-sm text-[#555] mt-6">
        Belum punya akun?{' '}
        <button
          type="button"
          onClick={onSwitch}
          className="text-[#1a1a1a] font-semibold underline underline-offset-2 hover:opacity-60 transition"
        >
          Daftar
        </button>
      </p>
    </div>
  )
}

// ─── SIGNUP FORM ──────────────────────────────────────────────────────────────
function FormSignUp({
  name, setName, email, setEmail, password, setPassword,
  error, loading, onSubmit, onSwitch,
}: {
  name: string; setName: (v: string) => void
  email: string; setEmail: (v: string) => void
  password: string; setPassword: (v: string) => void
  error: string; loading: boolean
  onSubmit: (e: React.FormEvent) => void
  onSwitch: () => void
}) {
  return (
    <div className="w-full max-w-sm">
      <p className="text-[0.7rem] font-medium uppercase tracking-[2px] mb-3 text-[#555]">
        Bergabung Bersama Kami
      </p>
      <h1
        style={{ fontFamily: "'Playfair Display', serif" }}
        className="text-3xl font-normal mb-1"
      >
        Buat Akun
      </h1>
      <p className="text-sm text-[#555] mb-7">
        Daftar untuk akses penawaran eksklusif dan lacak pesanan Anda.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Nama Lengkap" type="text" value={name} onChange={setName} placeholder="Nama Anda" />
        <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="anda@email.com" />
        <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="Min. 8 karakter" />

        {error && <ErrorBox msg={error} />}

        <SubmitBtn loading={loading} label="Daftar Sekarang" loadingLabel="Membuat akun..." />
      </form>

      <p className="text-center text-sm text-[#555] mt-6">
        Sudah punya akun?{' '}
        <button
          type="button"
          onClick={onSwitch}
          className="text-[#1a1a1a] font-semibold underline underline-offset-2 hover:opacity-60 transition"
        >
          Masuk
        </button>
      </p>
    </div>
  )
}

// ─── SHARED ATOMS ─────────────────────────────────────────────────────────────
function Field({
  label, type, value, onChange, placeholder,
}: {
  label: string; type: string; value: string
  onChange: (v: string) => void; placeholder: string
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium uppercase tracking-widest mb-2 text-[#555]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        placeholder={placeholder}
        className="w-full px-4 py-3 text-sm bg-white focus:outline-none transition"
        style={{ border: '1px solid #D8D8D8' }}
        onFocus={(e) => (e.currentTarget.style.borderColor = '#1a1a1a')}
        onBlur={(e) => (e.currentTarget.style.borderColor = '#D8D8D8')}
      />
    </div>
  )
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div
      className="p-3 text-sm text-[#D30005]"
      style={{ backgroundColor: '#fff0f0', border: '1px solid #fca5a5' }}
    >
      {msg}
    </div>
  )
}

function SubmitBtn({ loading, label, loadingLabel }: { loading: boolean; label: string; loadingLabel: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-[#1a1a1a] text-white text-[12px] font-medium uppercase tracking-widest py-4 hover:opacity-80 transition disabled:opacity-40 mt-1"
    >
      {loading ? loadingLabel : label}
    </button>
  )
}
