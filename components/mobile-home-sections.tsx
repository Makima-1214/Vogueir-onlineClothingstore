'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ALL_PRODUCTS_LIST } from '@/lib/products'
import { useCart } from '@/hooks/use-cart'
import { cartEvents } from '@/components/cart-sidebar'

// ─── QUICK ACCESS DATA ────────────────────────────────────────────────────────
const QUICK_ITEMS = [
  {
    label: 'New\nArrivals',
    href: '/products?filter=new',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.02 12.02.707.707M3 12h1m16 0h1M4.927 19.073l.707-.707M18.364 5.636l.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
      </svg>
    ),
  },
  {
    label: 'Men',
    href: '/products?category=men',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    label: 'Women',
    href: '/products?category=women',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v8m-3-3h6" />
      </svg>
    ),
  },
  {
    label: 'Collections',
    href: '/collection',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Wishlist',
    href: '/profile',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    label: 'Orders',
    href: '/profile',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Sale',
    href: '/products?sale=true',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    accent: true,
  },
]

// ─── BANNER DATA ──────────────────────────────────────────────────────────────
const BANNERS = [
  {
    id: 1,
    eyebrow: 'New Arrivals · AW 2026',
    title: 'Dark\nUtility',
    cta: 'Shop Now',
    href: '/products',
    bg: '#1C1C1C',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop',
    textColor: '#fff',
  },
  {
    id: 2,
    eyebrow: "Women's Collection",
    title: 'Soft\nForms',
    cta: 'Explore',
    href: '/collection',
    bg: '#E8E4DC',
    img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop',
    textColor: '#111',
  },
  {
    id: 3,
    eyebrow: 'Up to 50% Off',
    title: 'End of\nSeason',
    cta: 'Shop Sale',
    href: '/products?sale=true',
    bg: '#111',
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop',
    textColor: '#fff',
    saleBadge: true,
  },
]

// ─── POPULAR CATEGORIES ───────────────────────────────────────────────────────
const POP_CATEGORIES = [
  {
    label: 'Streetwear',
    href: '/products?style=streetwear',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 7l2-2h8l2 2" />
        <path d="M7 7v10a1 1 0 001 1h8a1 1 0 001-1V7" />
        <path d="M9 14h6" />
      </svg>
    ),
  },
  {
    label: 'Casual',
    href: '/products?style=casual',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7l4-2 4 2 4-2 4 2v10a1 1 0 01-1 1H5a1 1 0 01-1-1V7z" />
        <path d="M8 7v4" />
      </svg>
    ),
  },
  {
    label: 'Formal',
    href: '/products?style=formal',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l3 6-3 4-3-4 3-6z" />
        <path d="M9 13l-2 7h10l-2-7" />
      </svg>
    ),
  },
  {
    label: 'Accessories',
    href: '/products?category=accessories',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 7v-2a3 3 0 016 0v2" />
        <path d="M5 7h14l-1.5 11h-11L5 7z" />
        <path d="M9 18h6" />
      </svg>
    ),
  },
  {
    label: 'Footwear',
    href: '/products?category=footwear',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 16s1.5-3 3-3 3 3 5 3 3-1 4-2 1-4 1-4H5l1 6z" />
        <path d="M6 16l-1 3h13" />
      </svg>
    ),
  },
  {
    label: 'Limited',
    href: '/products?filter=limited',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.9 5.9L21 9l-4.5 4.4L17.8 21 12 17.6 6.2 21l1.3-7.6L3 9l6.1-1.1L12 2z" />
      </svg>
    ),
  },
]

// ─── TRENDING PRODUCTS ────────────────────────────────────────────────────────
const TRENDING = ALL_PRODUCTS_LIST.slice(0, 6)

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-baseline justify-between mb-4">
      <h2
        className="text-[18px] font-normal uppercase tracking-wider"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="text-[10px] font-medium uppercase tracking-wider text-[#707072] border-b border-[#C0C0C0] pb-px"
        >
          View All
        </Link>
      )}
    </div>
  )
}

// ─── MINI PRODUCT CARD ────────────────────────────────────────────────────────
function MiniProductCard({ product }: { product: typeof TRENDING[0] }) {
  const cart = useCart()

  return (
    <Link href={`/products/${product.id}`} className="group flex-shrink-0 w-[150px]">
      <div className="relative bg-[#f0f0f0] aspect-[3/4] overflow-hidden mb-2">
        <img
          src={product.variants[0]?.imgs[0] ?? ''}
          alt={product.name}
          className="w-full h-full object-cover group-active:scale-105 transition-transform duration-300"
        />
        {product.originalPrice && (
          <div
            className="absolute top-2 left-2 text-white text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5"
            style={{ backgroundColor: '#D30005' }}
          >
            Sale
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault()
            cart.addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
              size: 'M',
              color: product.variants[0]?.color ?? '#111',
              img: product.variants[0]?.imgs[0] ?? '',
            })
            cartEvents.open()
          }}
          className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] text-white text-[10px] font-medium uppercase tracking-wider py-2.5 translate-y-full group-hover:translate-y-0 active:translate-y-0 transition-transform duration-200"
        >
          + Add
        </button>
      </div>
      <p className="text-[12px] font-medium truncate">{product.name}</p>
      <p className="text-[11px] text-[#707072] uppercase tracking-wider truncate mb-1">{product.category}</p>
      <p className="text-[12px] font-semibold" style={{ color: product.originalPrice ? '#D30005' : '#1a1a1a' }}>
        Rp {product.price.toLocaleString('id-ID')}
      </p>
    </Link>
  )
}

// ─── BANNER CAROUSEL ──────────────────────────────────────────────────────────
function BannerCarousel() {
  const [active, setActive] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % BANNERS.length)
    }, 4000)
  }

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const goTo = (i: number) => {
    setActive(i)
    if (timerRef.current) clearInterval(timerRef.current)
    startTimer()
  }

  return (
    <div className="px-4 mb-6">
      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '16/9' }}>
        <AnimatePresence mode="wait">
          {BANNERS.map((b, i) =>
            i === active ? (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute inset-0 flex items-end p-5"
                style={{ background: b.bg }}
              >
                <img
                  src={b.img}
                  alt={b.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                {b.saleBadge && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D30005]" />
                )}
                <div className="relative z-10">
                  <p
                    className="text-[9px] font-medium uppercase tracking-[0.12em] mb-1.5"
                    style={{ color: b.textColor, opacity: 0.65 }}
                  >
                    {b.eyebrow}
                  </p>
                  <h3
                    className="text-[26px] leading-[0.9] uppercase mb-3"
                    style={{ fontFamily: "'Playfair Display', serif", color: b.textColor }}
                  >
                    {b.title.split('\n').map((line, i) => (
                      <span key={i}>{line}{i < b.title.split('\n').length - 1 && <br />}</span>
                    ))}
                  </h3>
                  <Link
                    href={b.href}
                    className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider px-4 py-2 rounded-full"
                    style={{
                      background: b.textColor,
                      color: b.bg,
                    }}
                  >
                    {b.cta}
                  </Link>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute bottom-3 right-4 flex gap-1.5 z-10">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === active ? 16 : 5,
                height: 5,
                background: i === active ? '#fff' : 'rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export function MobileHomeSections() {
  return (
    <div className="md:hidden">
      {/* Quick Access Grid */}
      <div className="px-4 pt-5 pb-2">
        <SectionHeader title="Quick Access" />
        <div className="grid grid-cols-4 gap-3">
          {QUICK_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 group-active:scale-95"
                style={{
                  background: item.accent ? '#1a1a1a' : '#f3efe9',
                  color: item.accent ? '#fff' : '#1a1a1a',
                }}
              >
                {item.icon}
              </div>
              <span
                className="text-[9px] font-medium uppercase tracking-wider text-center leading-tight"
                style={{ color: '#555' }}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 my-5 border-t border-[#eaeaea]" />

      {/* Featured Banner Carousel */}
      <div className="mb-2">
        <div className="px-4 mb-3">
          <SectionHeader title="Featured" />
        </div>
        <BannerCarousel />
      </div>

      {/* Popular Categories */}
      <div className="px-4 mb-6">
        <SectionHeader title="Popular Categories" href="/products" />
        <div className="flex gap-2.5 overflow-x-auto scrollbar-none -mx-4 px-4">
          {POP_CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="flex-shrink-0 flex flex-col items-center gap-2 group"
            >
              <div
                className="w-[70px] h-[70px] rounded-3xl flex items-center justify-center transition-all duration-200 group-active:scale-95"
                style={{ background: '#f3efe9', color: '#1a1a1a' }}
              >
                {cat.icon}
              </div>
              <span className="text-[10px] font-semibold text-[#1a1a1a] tracking-wide whitespace-nowrap text-center">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div className="px-4 mb-6">
        <SectionHeader title="Trending Now" href="/products" />
        <div className="flex gap-3 overflow-x-auto scrollbar-none -mx-4 px-4">
          {TRENDING.map((p) => (
            <MiniProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div
        className="mx-4 mb-6 rounded-2xl overflow-hidden"
        style={{ background: '#f3efe9' }}
      >
        <div className="px-4 pt-4 pb-2">
          <SectionHeader title="Best Sellers" href="/products" />
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-none px-4 pb-4">
          {ALL_PRODUCTS_LIST.slice(4, 10).map((p) => (
            <MiniProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Popular This Week pill strip */}
      <div className="px-4 mb-6">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: '#1a1a1a' }}
        >
          <span className="text-white text-[11px] font-medium uppercase tracking-wider flex-shrink-0">
            🔥 Popular This Week
          </span>
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {['Jacket', 'Hoodie', 'Cargo', 'Tote'].map((tag) => (
              <Link
                key={tag}
                href={`/products?q=${tag.toLowerCase()}`}
                className="flex-shrink-0 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav spacer */}
      <div className="h-20" />
    </div>
  )
}
