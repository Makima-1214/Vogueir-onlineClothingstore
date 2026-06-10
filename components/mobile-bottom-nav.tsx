'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { useCart } from '@/hooks/use-cart'
import { cartEvents } from '@/components/cart-sidebar'
import { useSession } from '@/lib/auth-client'

// ─── DESIGN TOKENS (mirrors globals.css) ────────────────────────────────────
const INK = '#1a1a1a'
const MUTE = '#9E9EA0'
const CANVAS = '#faf9f8'

// ─── ICONS (stroke 1.75 — readable but refined) ─────────────────────────────
function HomeIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H5a1 1 0 01-1-1V9.75z" fill={filled ? 'currentColor' : 'none'} />
      <path d="M9 22V12h6v10" stroke={filled ? CANVAS : 'currentColor'} />
    </svg>
  )
}

function DiscoverIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" fill={filled ? 'currentColor' : 'none'} />
      <path d="M21 21l-4.35-4.35" stroke={filled ? CANVAS : 'currentColor'} />
      {filled && <circle cx="11" cy="11" r="3.5" fill="white" opacity="0.25" />}
    </svg>
  )
}

function WishlistIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  )
}

function CartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" stroke={filled ? CANVAS : 'currentColor'} strokeWidth="1.75" />
      <path d="M16 10a4 4 0 01-8 0" stroke={filled ? CANVAS : 'currentColor'} />
    </svg>
  )
}

function ProfileIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4" fill={filled ? 'currentColor' : 'none'} />
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" fill={filled ? 'currentColor' : 'none'} />
    </svg>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export function MobileBottomNav() {
  const pathname = usePathname()
  const cart = useCart()
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)
  const [prevScrollY, setPrevScrollY] = useState(0)
  const [visible, setVisible] = useState(true)
  const [tappedId, setTappedId] = useState<string | null>(null)

  useEffect(() => { setMounted(true) }, [])

  // Hide nav on scroll down, reveal on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      if (current < 60) {
        setVisible(true)
      } else {
        setVisible(current < prevScrollY)
      }
      setPrevScrollY(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollY])

  const cartCount = mounted ? cart.items.reduce((s, i) => s + i.quantity, 0) : 0
  const profileHref = session?.user ? '/profile' : '/sign-in'

  const tabs = [
    { id: 'home',     label: 'Home',     href: '/',         Icon: HomeIcon,     active: pathname === '/' },
    { id: 'discover', label: 'Discover', href: '/products', Icon: DiscoverIcon, active: pathname.startsWith('/products') },
    { id: 'wishlist', label: 'Wishlist', href: '/profile',  Icon: WishlistIcon, active: false },
    { id: 'cart',     label: 'Cart',     href: null,        Icon: CartIcon,     active: pathname === '/cart' },
    { id: 'profile',  label: 'Profile',  href: profileHref, Icon: ProfileIcon,  active: pathname.startsWith('/profile') },
  ]

  const handleTap = useCallback((id: string) => {
    setTappedId(id)
    setTimeout(() => setTappedId(null), 350)
  }, [])

  // Don't render on the server — avoids Framer Motion hydration mismatch
  if (!mounted) return null

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.nav
          key="bottom-nav"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 280 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-[100]"
          style={{
            /* Frosted glass surface */
            background: 'rgba(250, 249, 248, 0.94)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderTop: '1px solid rgba(26,26,26,0.07)',
            boxShadow: '0 -2px 20px rgba(0,0,0,0.05), 0 -1px 0 rgba(0,0,0,0.04)',
          }}
        >
          {/* Safe-area bottom padding */}
          <div
            className="flex items-stretch px-1"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 6px)' }}
          >
            {tabs.map((tab) =>
              tab.href === null ? (
                /* ── Cart button (opens sidebar) ── */
                <CartTabButton
                  key={tab.id}
                  id={tab.id}
                  label={tab.label}
                  active={tab.active}
                  cartCount={cartCount}
                  tapped={tappedId === tab.id}
                  onTap={() => {
                    handleTap(tab.id)
                    cartEvents.open()
                  }}
                />
              ) : (
                /* ── Regular link tab ── */
                <LinkTab
                  key={tab.id}
                  id={tab.id}
                  label={tab.label}
                  href={tab.href}
                  active={tab.active}
                  tapped={tappedId === tab.id}
                  onTap={() => handleTap(tab.id)}
                >
                  {(active) => <tab.Icon filled={active} />}
                </LinkTab>
              )
            )}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

// ─── LINK TAB ────────────────────────────────────────────────────────────────
function LinkTab({
  id,
  href,
  label,
  active,
  tapped,
  onTap,
  children,
}: {
  id: string
  href: string
  label: string
  active: boolean
  tapped: boolean
  onTap: () => void
  children: (active: boolean) => React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onTap}
      className="relative flex-1 flex flex-col items-center justify-center py-2 min-h-[56px] select-none"
      aria-label={label}
      aria-current={active ? 'page' : undefined}
    >
      {/* Active pill background */}
      {active && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-x-1.5 inset-y-1 rounded-xl"
          style={{ background: 'rgba(26,26,26,0.06)' }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        />
      )}

      {/* Tap ripple */}
      <AnimatePresence>
        {tapped && (
          <motion.span
            key="ripple"
            initial={{ scale: 0.5, opacity: 0.35 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
            className="absolute inset-x-2 top-1.5 bottom-1.5 rounded-xl pointer-events-none"
            style={{ background: INK }}
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      <motion.span
        className="relative z-10 mb-0.5"
        animate={{
          color: active ? INK : MUTE,
          scale: active ? 1.06 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      >
        {children(active)}
      </motion.span>

      {/* Label */}
      <motion.span
        className="relative z-10 text-[10px] font-medium tracking-wide leading-none"
        animate={{ color: active ? INK : MUTE }}
        transition={{ duration: 0.18 }}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {label}
      </motion.span>
    </Link>
  )
}

// ─── CART TAB BUTTON ─────────────────────────────────────────────────────────
function CartTabButton({
  id,
  label,
  active,
  cartCount,
  tapped,
  onTap,
}: {
  id: string
  label: string
  active: boolean
  cartCount: number
  tapped: boolean
  onTap: () => void
}) {
  return (
    <button
      onClick={onTap}
      aria-label={`Open cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
      className="relative flex-1 flex flex-col items-center justify-center py-2 min-h-[56px] select-none"
    >
      {/* Active pill */}
      {active && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-x-1.5 inset-y-1 rounded-xl"
          style={{ background: 'rgba(26,26,26,0.06)' }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        />
      )}

      {/* Tap ripple */}
      <AnimatePresence>
        {tapped && (
          <motion.span
            key="cart-ripple"
            initial={{ scale: 0.5, opacity: 0.35 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
            className="absolute inset-x-2 top-1.5 bottom-1.5 rounded-xl pointer-events-none"
            style={{ background: INK }}
          />
        )}
      </AnimatePresence>

      {/* Icon + badge */}
      <motion.span
        className="relative z-10 mb-0.5"
        animate={{ color: active ? INK : MUTE }}
        transition={{ duration: 0.18 }}
        whileTap={{ scale: 0.88 }}
      >
        <CartIcon filled={active} />

        {/* Cart count badge */}
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 520, damping: 22 }}
              className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-[3px] rounded-full flex items-center justify-center font-semibold text-[9px] text-white pointer-events-none"
              style={{ background: INK, lineHeight: 1 }}
            >
              {cartCount > 99 ? '99+' : cartCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>

      {/* Label */}
      <motion.span
        className="relative z-10 text-[10px] font-medium tracking-wide leading-none"
        animate={{ color: active ? INK : MUTE }}
        transition={{ duration: 0.18 }}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {label}
      </motion.span>
    </button>
  )
}
