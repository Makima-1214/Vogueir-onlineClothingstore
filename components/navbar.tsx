'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
import { Search, User, ShoppingBag, X, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'Shop',       href: '/products' },
  { label: 'Collection', href: '/collection' },
  { label: 'About Us',   href: '/about' },
  { label: 'Contact',    href: '/contact' },
]

export function Navbar() {
  const pathname              = usePathname()
  const { data: session }     = useSession()
  const sessionUser           = (session as any)?.user ?? null
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted]   = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const close = () => setMenuOpen(false)

  return (
    <>
      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(250,249,248,0.95)' : 'rgba(250,249,248,0)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(234,234,234,0.8)' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.04)' : 'none',
        }}
      >
        <div className="flex items-center justify-between px-5 md:px-10 h-[60px] md:h-[68px]">

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center leading-none select-none flex-shrink-0">
            <span
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-xl md:text-2xl font-semibold tracking-[3px] uppercase text-[#1a1a1a]"
            >
              VGRATION
            </span>
            <span className="text-[0.4rem] tracking-[5px] uppercase font-normal text-[#1a1a1a] mt-[-1px]">
              FASHION
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[0.78rem] font-semibold uppercase tracking-[1px] text-[#1a1a1a] hover:text-[#888] transition-colors group"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[1.5px] bg-[#1a1a1a] transition-all duration-300"
                  style={{ width: isActive(link.href) ? '100%' : '0%' }}
                />
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f3efe9] transition text-[#1a1a1a]"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link
              href={sessionUser ? '/profile' : '/sign-in'}
              aria-label="Account"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f3efe9] transition text-[#1a1a1a]"
            >
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link
              href="/cart"
              aria-label="Cart"
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f3efe9] transition text-[#1a1a1a]"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
            </Link>
            {/* Hamburger */}
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex flex-col items-center justify-center w-9 h-9 gap-[5px] rounded-full hover:bg-[#f3efe9] transition"
            >
              <span className="block h-[1.5px] w-5 bg-[#1a1a1a]" />
              <span className="block h-[1.5px] w-3.5 bg-[#1a1a1a]" />
            </button>
          </div>
        </div>
      </header>

      {/* ── SPACER ──────────────────────────────────────────────────────── */}
      <div className="h-[60px] md:h-[68px]" />

      {/* ── OVERLAY ─────────────────────────────────────────────────────── */}
      {mounted && menuOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden bg-black/40 backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* ── DRAWER ──────────────────────────────────────────────────────── */}
      {mounted && (
        <div
          className="fixed top-0 right-0 bottom-0 z-[70] md:hidden flex flex-col bg-[#faf9f8]"
          style={{
            width: 'min(300px, 82vw)',
            transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 350ms cubic-bezier(0.32,0.72,0,1)',
            boxShadow: '-4px 0 24px rgba(0,0,0,0.10)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 border-b border-[#eaeaea]" style={{ height: '60px', flexShrink: 0 }}>
            <Link href="/" onClick={close} className="flex flex-col items-center leading-none select-none">
              <span
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-base font-semibold tracking-[3px] uppercase text-[#1a1a1a]"
              >
                VGRATION
              </span>
              <span className="text-[0.38rem] tracking-[5px] uppercase text-[#1a1a1a]">
                FASHION
              </span>
            </Link>
            <button
              onClick={close}
              aria-label="Close menu"
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f3efe9] transition text-[#1a1a1a]"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-6 py-4">
            <ul className="space-y-0">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      className="flex items-center justify-between py-3 border-b border-[#f0f0f0] group"
                    >
                      <span
                        className="text-[13px] font-semibold uppercase tracking-[1.5px] transition-colors duration-150 group-hover:text-[#1a1a1a]"
                        style={{ color: active ? '#1a1a1a' : '#555' }}
                      >
                        {link.label}
                      </span>
                      {active && (
                        <span className="w-1 h-1 rounded-full bg-[#1a1a1a]" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Account */}
            <div className="mt-6">
              {sessionUser ? (
                <Link
                  href="/profile"
                  onClick={close}
                  className="flex items-center gap-2 text-[#888] hover:text-[#1a1a1a] transition-colors py-2"
                >
                  <User size={14} strokeWidth={1.5} />
                  <span className="text-[11px] font-medium uppercase tracking-[1.5px]">My Account</span>
                </Link>
              ) : (
                <Link
                  href="/sign-in"
                  onClick={close}
                  className="flex items-center gap-2 text-[#888] hover:text-[#1a1a1a] transition-colors py-2"
                >
                  <User size={14} strokeWidth={1.5} />
                  <span className="text-[11px] font-medium uppercase tracking-[1.5px]">Sign In</span>
                </Link>
              )}
            </div>
          </nav>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#eaeaea] flex-shrink-0">
            {!sessionUser && (
              <Link
                href="/sign-up"
                onClick={close}
                className="block w-full py-2.5 border border-[#1a1a1a] text-[#1a1a1a] text-[11px] font-semibold uppercase tracking-widest text-center hover:bg-[#1a1a1a] hover:text-white transition-colors duration-200 mb-3"
              >
                Create Account
              </Link>
            )}
            <p className="text-[10px] text-[#bbb] tracking-[1.5px] uppercase text-center">
              © 2024 Vgration Fashion
            </p>
          </div>
        </div>
      )}
    </>
  )
}
