'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, User, ShoppingBag, Menu, X, Trash2, ArrowRight } from 'lucide-react'
import { ALL_PRODUCTS_LIST, type Product } from '@/lib/products'
import { useCart } from '../hooks/use-cart'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const cart = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Load recent searches dari localStorage saat mount
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) setRecentSearches(JSON.parse(saved))
  }, [])

  // Tutup menu otomatis saat pindah halaman
  useEffect(() => {
    setIsOpen(false)
    setIsSearchOpen(false)
    setIsCartOpen(false)
  }, [pathname])

  const addToRecentSearches = (query: string) => {
    const q = query.trim()
    if (!q) return
    const updated = [q, ...recentSearches.filter(item => item !== q)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  // Logika pencarian
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = ALL_PRODUCTS_LIST.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const subtotal = cart.items.reduce((s, i) => s + i.price * i.quantity, 0)

  const navLinks = [
    { name: 'Shop', href: '/products' },
    { name: 'Collections', href: '/collection' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <nav 
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? 'bg-white shadow-sm py-3' : 'bg-[#faf9f8] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-between relative">
          
          {/* Hamburger Menu untuk Mobile */}
          <button 
            className="md:hidden p-2 -ml-2 text-[#1a1a1a]"
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo Terpusat di Mobile, Kiri di Desktop */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <span 
              className="text-xl md:text-2xl font-bold tracking-[4px] uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Vogueir
            </span>
          </Link>

          {/* Link Navigasi Desktop */}
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

          {/* Ikon Utility */}
          <div className="flex items-center gap-2 md:gap-5">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-[#1a1a1a] hover:opacity-60 transition">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link href="/sign-in" className="hidden sm:block p-2 text-[#1a1a1a] hover:opacity-60 transition">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <button onClick={() => setIsCartOpen(true)} className="p-2 text-[#1a1a1a] hover:opacity-60 transition relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <motion.span
                key={mounted ? cart.items.length : 0}
                initial={{ scale: 1 }}
                animate={mounted && cart.items.length > 0 ? { scale: [1, 1.6, 1] } : {}}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-1 right-1 bg-[#1a1a1a] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center"
              >
                {mounted ? cart.items.length : 0}
              </motion.span>
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
            className="fixed inset-0 z-[110] bg-white flex flex-col"
          >
            <div className="px-6 md:px-10 py-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex-1 flex items-center gap-4 max-w-4xl mx-auto">
                <Search size={22} className="text-[#9E9EA0]" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xl md:text-2xl font-light outline-none bg-transparent"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                />
              </div>
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery('') }}
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
                          <div className="w-20 h-28 bg-gray-100 overflow-hidden flex-shrink-0">
                            <img src={p.variants[0].imgs[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
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
                          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#9E9EA0]">Pencarian Terakhir</h4>
                          <button onClick={clearRecentSearches} className="text-[10px] text-[#9E9EA0] hover:text-[#1a1a1a] transition uppercase tracking-widest">Hapus Semua</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map(s => (
                            <button key={s} onClick={() => setSearchQuery(s)} className="px-4 py-2 bg-white border border-gray-100 text-[12px] hover:border-[#1a1a1a] transition">{s}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#9E9EA0] mb-6">Saran Pencarian</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Jacket', 'Hoodie', 'Cargo', 'Shirt', 'Tote Bag'].map(sug => (
                        <button key={sug} onClick={() => { setSearchQuery(sug); addToRecentSearches(sug) }} className="px-4 py-2 bg-white border border-gray-100 text-[12px] hover:border-[#1a1a1a] transition">{sug}</button>
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-bold tracking-[3px] uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>Vogueir</span>
                <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 text-[#1a1a1a]"><X size={24} /></button>
              </div>

              <motion.div 
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
                className="flex flex-col gap-6"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: 20 }
                    }}
                  >
                    <Link href={link.href} className="text-3xl font-light uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>
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
                <Link 
                  href="/sign-in" 
                  className="text-[13px] font-medium uppercase tracking-widest flex items-center gap-3 hover:text-[#707072] transition"
                >
                  <User size={18} /> 
                  Masuk / Daftar
                </Link>
                <p className="text-[10px] text-[#9E9EA0] mt-4 uppercase tracking-widest">© 2024 Vogueir Fashion</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[120] bg-black/30 backdrop-blur-sm"
            />
            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-[400px] z-[130] bg-white shadow-2xl flex flex-col"
            >
              <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-[14px] font-semibold uppercase tracking-widest">Keranjang Belanja</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 -mr-2 hover:bg-gray-50 rounded-full transition">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                {!mounted || cart.items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <ShoppingBag size={24} className="text-[#9E9EA0]" />
                    </div>
                    <p className="text-[13px] text-[#555] mb-6">Keranjang kamu masih kosong.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-[11px] font-semibold uppercase tracking-widest border-b border-[#1a1a1a] pb-1 hover:opacity-60 transition"
                    >
                      Mulai Belanja
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-20 h-24 bg-gray-50 overflow-hidden flex-shrink-0">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-[13px] font-medium leading-tight max-w-[160px]">{item.name}</h3>
                            <button onClick={() => cart.removeItem(item.id)} className="text-[#9E9EA0] hover:text-[#D30005] transition">
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <p className="text-[10px] text-[#9E9EA0] uppercase tracking-wider mb-2">{item.color} / {item.size}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border border-gray-200">
                              <button onClick={() => cart.updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-xs hover:bg-gray-50 transition">−</button>
                              <span className="px-3 py-1 text-[11px] min-w-[30px] text-center">{item.quantity}</span>
                              <button onClick={() => cart.updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-xs hover:bg-gray-50 transition">+</button>
                            </div>
                            <p className="text-[12px] font-semibold">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {mounted && cart.items.length > 0 && (
                <div className="px-6 py-8 bg-gray-50 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[11px] font-medium uppercase tracking-widest text-[#707072]">Subtotal</span>
                    <span className="text-[15px] font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="space-y-2">
                    <Link 
                      href="/checkout" 
                      className="w-full h-12 bg-[#1a1a1a] text-white text-[11px] font-semibold uppercase tracking-[2px] flex items-center justify-center gap-2 hover:opacity-90 transition shadow-lg shadow-black/5"
                    >
                      Checkout Sekarang
                    </Link>
                    <Link 
                      href="/cart" 
                      className="w-full h-12 border border-gray-200 text-[#1a1a1a] text-[11px] font-semibold uppercase tracking-[2px] flex items-center justify-center hover:bg-white transition"
                    >
                      Lihat Keranjang Penuh
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="h-[65px] md:h-[85px]" /> {/* Spacer untuk mengimbangi nav yang fixed */}
    </>
  )
}