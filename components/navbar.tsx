'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, User, ShoppingBag, Menu, X, LogOut, Package, Settings } from 'lucide-react'
import { ALL_PRODUCTS_LIST, type Product } from '@/lib/products'
import { useCart } from '@/hooks/use-cart'
import { cartEvents } from '@/components/cart-sidebar'
import { useSession, signOut } from '@/lib/auth-client'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [scrolled, setScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  const cart = useCart()
  const [mounted, setMounted] = useState(false)
  const { data: session, isPending: sessionPending } = useSession()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMounted(true) }, [])

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleSignOut() {
    setIsProfileOpen(false)
    await signOut()
    window.location.href = '/'
  }

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) setRecentSearches(JSON.parse(saved))
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  // Debounce search input by 300ms to reduce filtering on every keystroke
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(value)
    }, 300)
  }, [])

  // Memoized filtering — only recalculates when debouncedQuery changes
  const searchResults = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    if (q.length <= 1) return []
    return ALL_PRODUCTS_LIST.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [debouncedQuery])

  const addToRecentSearches = useCallback((query: string) => {
    const q = query.trim()
    if (!q) return
    setRecentSearches((prev) => {
      const updated = [q, ...prev.filter((item) => item !== q)].slice(0, 5)
      localStorage.setItem('recentSearches', JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }, [])

  const navLinks = [
    { name: 'Toko', href: '/products' },
    { name: 'Koleksi', href: '/collection' },
    { name: 'Tentang', href: '/about' },
    { name: 'Kontak', href: '/contact' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? 'bg-white shadow-sm' : 'bg-[#faf9f8]'
        } py-4`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-between relative">

          {/* Logo — kiri di mobile, kiri di desktop */}
          <Link href="/" className="md:static">
            <Image
              src="/logo.svg"
              alt="Vogueir"
              width={160}
              height={44}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Nav Links Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] uppercase tracking-widest font-medium transition-colors hover:text-[#1a1a1a] ${
                  pathname === link.href ? 'text-[#1a1a1a]' : 'text-[#707072]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Utility Icons */}
          <div className="flex items-center gap-2 md:gap-5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#1a1a1a] hover:opacity-60 transition"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* User Avatar / Login Button */}
            <div className="relative" ref={profileRef}>
              {sessionPending ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              ) : session?.user ? (
                <>
                  <button
                    onClick={() => setIsProfileOpen((v) => !v)}
                    className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-xs font-semibold uppercase hover:opacity-80 transition focus:outline-none"
                    aria-label="Profil"
                  >
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name ?? 'Profil'}
                        width={32}
                        height={32}
                        className="w-full h-full rounded-full object-cover"
                        unoptimized
                      />
                    ) : (
                      (session.user.name ?? session.user.email).charAt(0).toUpperCase()
                    )}
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute right-0 top-full mt-3 w-52 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden z-50"
                      >
                        {/* User info header */}
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-[13px] font-semibold truncate">
                            {session.user.name ?? 'Pengguna'}
                          </p>
                          <p className="text-[11px] text-[#9E9EA0] truncate">{session.user.email}</p>
                        </div>

                        {/* Menu items */}
                        <div className="py-1">
                          <Link
                            href="/profile"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#1a1a1a] hover:bg-[#faf9f8] transition"
                          >
                            <Settings size={15} strokeWidth={1.5} />
                            Profil Saya
                          </Link>
                          <Link
                            href="/profile"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#1a1a1a] hover:bg-[#faf9f8] transition"
                          >
                            <Package size={15} strokeWidth={1.5} />
                            Pesanan Saya
                          </Link>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-gray-100 py-1">
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition"
                          >
                            <LogOut size={15} strokeWidth={1.5} />
                            Keluar
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                // Not logged in — icon user biasa
                <Link href="/sign-in" className="p-2 text-[#1a1a1a] hover:opacity-60 transition">
                  <User size={20} strokeWidth={1.5} />
                </Link>
              )}
            </div>
            {/* Cart button — trigger ke CartSidebar di root layout */}
            <button
              onClick={cartEvents.open}
              className="p-2 text-[#1a1a1a] hover:opacity-60 transition relative"
              aria-label="Buka keranjang"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <motion.span
                key={mounted ? cart.items.length : 0}
                initial={{ scale: 1 }}
                animate={mounted && cart.items.length > 0 ? { scale: [1, 1.6, 1] } : {}}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute top-1 right-1 bg-[#1a1a1a] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center"
              >
                {mounted ? cart.items.length : 0}
              </motion.span>
            </button>

            {/* Hamburger — desktop only; mobile uses bottom nav */}
            <button
              className="hidden p-2 -mr-2 text-[#1a1a1a]"
              onClick={() => setIsOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col"
          >
            <div className="px-6 md:px-10 py-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex-1 flex items-center gap-4 max-w-4xl mx-auto">
                <Search size={22} className="text-[#9E9EA0]" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full text-xl md:text-2xl font-light outline-none bg-transparent"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                />
              </div>
              <button
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); setDebouncedQuery('') }}
                className="p-2 hover:bg-gray-50 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 md:px-10 py-10 bg-[#faf9f8]">
              <div className="max-w-4xl mx-auto">
                {searchQuery.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {searchResults.length > 0 ? (
                      searchResults.map((p) => (
                        <Link
                          key={p.id}
                          href={`/products/${p.id}`}
                          onClick={() => addToRecentSearches(searchQuery)}
                          className="flex gap-4 group"
                        >
                          <div className="w-20 h-28 bg-gray-100 overflow-hidden flex-shrink-0 relative">
                            <Image
                              src={p.variants[0].imgs[0]}
                              alt={p.name}
                              fill
                              className="object-cover group-hover:scale-105 transition duration-500"
                              sizes="80px"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="text-[10px] uppercase tracking-widest text-[#9E9EA0] mb-1">{p.category}</p>
                            <h3 className="text-[14px] font-medium mb-1">{p.name}</h3>
                            <p className="text-[13px] font-semibold">Rp {p.price.toLocaleString('id-ID')}</p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-full py-12 text-center text-[#9E9EA0]">
                        Tidak ada produk yang ditemukan untuk &quot;{searchQuery}&quot;
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-10">
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#9E9EA0]">
                            Pencarian Terakhir
                          </h4>
                          <button
                            onClick={clearRecentSearches}
                            className="text-[10px] text-[#9E9EA0] hover:text-[#1a1a1a] transition uppercase tracking-widest"
                          >
                            Hapus Semua
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((s) => (
                            <button
                              key={s}
                              onClick={() => setSearchQuery(s)}
                              className="px-4 py-2 bg-white border border-gray-100 text-[12px] hover:border-[#1a1a1a] transition"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#9E9EA0] mb-6">
                        Saran Pencarian
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Jacket', 'Hoodie', 'Cargo', 'Shirt', 'Tote Bag'].map((sug) => (
                          <button
                            key={sug}
                            onClick={() => { setSearchQuery(sug); addToRecentSearches(sug) }}
                            className="px-4 py-2 bg-white border border-gray-100 text-[12px] hover:border-[#1a1a1a] transition"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-white md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-12">
                <Image
                  src="/logo.svg"
                  alt="Vogueir"
                  width={140}
                  height={38}
                  className="h-9 w-auto"
                />
                <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 text-[#1a1a1a]">
                  <X size={24} />
                </button>
              </div>

              <motion.div
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                }}
                className="flex flex-col gap-6"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: 20 },
                    }}
                  >
                    <Link
                      href={link.href}
                      className="text-3xl font-light uppercase tracking-wider"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-6 border-t border-gray-100"
              >
                {session?.user ? (
                  <div className="space-y-5">
                    {/* Avatar + nama di mobile */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-sm font-semibold uppercase flex-shrink-0">
                        {session.user.image ? (
                          <Image src={session.user.image} alt="" width={40} height={40} className="w-full h-full rounded-full object-cover" unoptimized />
                        ) : (
                          (session.user.name ?? session.user.email).charAt(0).toUpperCase()
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold truncate">{session.user.name ?? 'Pengguna'}</p>
                        <p className="text-[11px] text-[#9E9EA0] truncate">{session.user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="text-[13px] font-medium uppercase tracking-widest flex items-center gap-3 hover:text-[#707072] transition py-3.5 block"
                    >
                      <Settings size={16} />
                      Profil Saya
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-[13px] font-medium uppercase tracking-widest flex items-center gap-3 text-red-500 hover:text-red-400 transition py-3.5 w-full text-left"
                    >
                      <LogOut size={16} />
                      Keluar
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/sign-in"
                    className="text-[13px] font-medium uppercase tracking-widest flex items-center gap-3 hover:text-[#707072] transition"
                  >
                    <User size={18} />
                    Masuk / Daftar
                  </Link>
                )}
                <p className="text-[10px] text-[#9E9EA0] mt-4 uppercase tracking-widest">© 2026 Vogueir Fashion</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-[57px] md:h-[85px]" />
    </>
  )
}