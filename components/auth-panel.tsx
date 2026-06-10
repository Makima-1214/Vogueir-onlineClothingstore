'use client'

import { useState, useEffect } from 'react'
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Mode = 'login' | 'signup'

// ─── IMAGES ───────────────────────────────────────────────────────────────────
const LOGIN_IMG =
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop'
const SIGNUP_IMG =
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&auto=format&fit=crop'

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function AuthPanel({ initialMode = 'login' }: { initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode)
  const [animating, setAnimating] = useState(false)

  const [direction, setDirection] = useState(0)
  // State untuk mendeteksi layar desktop agar animasi geser hanya aktif di layar lebar
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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
    setDirection(next === 'signup' ? 1 : -1)
    setMode(next)
    setTimeout(() => {
      setAnimating(false)
    }, 500)
  }

  // ── submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setError('')
    setLoading(true)
    
    // Simulasi validasi dasar
    if (password.length < 8) {
      setError('Password harus minimal 8 karakter.')
      setLoading(false)
      return
    }

    try {
      if (mode === 'login') {
        await authClient.signIn.email({ email, password })
      } else {
        await authClient.signUp.email({ email, password, name })
      }
      // Full reload agar session cookie terbaca oleh useSession yang baru mount
      window.location.href = '/'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Email atau password salah.')
    } finally {
      setLoading(false)
    }
  }

  const isLogin = mode === 'login'

  return (
    <main className="h-[100dvh] w-full flex bg-[#faf9f8] font-sans text-[#1a1a1a] overflow-hidden">
      <div className="relative flex w-full h-full overflow-hidden">
        
        {/* ── FORMS SECTION ────────────────────────────────────────────────── */}
        <motion.div
          className="w-full md:w-1/2 h-full flex flex-col p-6 sm:p-8 md:p-12 z-20 relative overflow-y-auto md:overflow-hidden bg-white md:bg-transparent"
          animate={{ x: isDesktop ? (isLogin ? '0%' : '100%') : '0%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        >
          {/* Mobile App-style Header */}
          <div className="flex items-center justify-between mb-10 md:mb-0 md:absolute md:top-10 md:left-10 w-full md:w-auto left-0 px-2 md:px-0">
            <Link
              href="/"
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition md:p-0 md:hover:bg-transparent"
              aria-label="Kembali"
            >
              <ArrowLeft size={22} strokeWidth={1.5} className="md:w-4 md:h-4" />
            </Link>
            <div className="md:hidden">
              <Image
                src="/logo.svg"
                alt="Vogueir"
                width={130}
                height={36}
                className="h-8 w-auto"
              />
            </div>
            <div className="w-10 md:hidden" /> {/* Spacer centering */}
          </div>

          <div className="w-full max-w-[400px] mx-auto my-auto">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              {isLogin ? (
                <motion.div
                  key="login"
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (dir: number) => ({ x: dir < 0 ? -40 : 40, opacity: 0 })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  <FormLogin
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                    error={error}
                    loading={loading}
                    onSubmit={handleSubmit}
                    onSwitch={() => switchMode('signup')}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (dir: number) => ({ x: dir < 0 ? 40 : -40, opacity: 0 })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  <FormSignUp
                    name={name} setName={setName}
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                    error={error}
                    loading={loading}
                    onSubmit={handleSubmit}
                    onSwitch={() => switchMode('login')}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── DESKTOP IMAGE PANEL ─────────────────────────────────────────── */}
        <motion.div
          className="hidden md:block absolute inset-y-0 w-1/2 overflow-hidden z-30"
          initial={false}
          animate={{ x: isLogin ? '100%' : '0%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
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
            {/* Logo pojok kiri atas */}
            <Link href="/" className="absolute top-8 left-10 select-none z-10">
              <Image
                src="/logo.svg"
                alt="Vogueir"
                width={160}
                height={44}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <div className="absolute inset-0 flex flex-col justify-end p-10">
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
        </motion.div>
      </div>
    </main>
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
    <div className="flex flex-col">
      <p className="text-[0.65rem] md:text-[0.7rem] font-medium uppercase tracking-[2px] mb-2 text-[#555]">
        Selamat Datang Kembali
      </p>
      <h1
        style={{ fontFamily: "'Playfair Display', serif" }}
        className="text-2xl sm:text-4xl font-normal mb-1"
      >
        Masuk
      </h1>
      <p className="text-[13px] md:text-sm text-[#555] mb-6">
        Akses akun Anda untuk melihat pesanan dan item tersimpan.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="anda@email.com" />
        <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

        {error && <ErrorBox msg={error} />}

        <SubmitBtn loading={loading} label="Masuk" loadingLabel="Sedang masuk..." />
      </form>

      <p className="text-center text-xs md:text-sm text-[#555] mt-6">
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
    <div className="flex flex-col">
      <p className="text-[0.65rem] md:text-[0.7rem] font-medium uppercase tracking-[2px] mb-2 text-[#555]">
        Bergabung Bersama Kami
      </p>
      <h1
        style={{ fontFamily: "'Playfair Display', serif" }}
        className="text-2xl sm:text-4xl font-normal mb-1"
      >
        Buat Akun
      </h1>
      <p className="text-[13px] md:text-sm text-[#555] mb-4">
        Daftar untuk akses penawaran eksklusif dan lacak pesanan Anda.
      </p>

      <form onSubmit={onSubmit} className="space-y-3">
        <Field label="Nama Lengkap" type="text" value={name} onChange={setName} placeholder="Nama Anda" />
        <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="anda@email.com" />
        <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="Min. 8 karakter" />

        {error && <ErrorBox msg={error} />}

        <SubmitBtn loading={loading} label="Daftar Sekarang" loadingLabel="Membuat akun..." />
      </form>

      <p className="text-center text-xs md:text-sm text-[#555] mt-6">
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
        className="w-full h-14 px-4 text-[15px] bg-[#f9f9f9] focus:bg-white focus:outline-none transition-all duration-200 rounded-xl"
        style={{ border: '1px solid #D8D8D8' }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#1a1a1a' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = '#D8D8D8' }}
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
      className="relative w-full h-14 bg-[#1a1a1a] text-white text-[13px] font-semibold uppercase tracking-widest hover:opacity-90 active:scale-[0.96] transition-all disabled:opacity-50 mt-4 flex items-center justify-center overflow-hidden rounded-xl shadow-lg shadow-black/5"
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2"
          >
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {loadingLabel}
          </motion.div>
        ) : (
          <motion.span key="label" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{label}</motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
