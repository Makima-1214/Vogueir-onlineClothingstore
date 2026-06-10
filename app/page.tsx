'use client'

import { Navbar } from '@/components/navbar'
import { MobileHomeSections } from '@/components/mobile-home-sections'
import Link from 'next/link'
import { useState } from 'react'
import { useGsapAnimations } from '@/hooks/useGsapAnimations'
import { PageFooter } from '@/components/page-footer'
import { useCart } from '@/hooks/use-cart'

// ─── INLINE ICONS ─────────────────────────────────────────────────────────────
function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

// ─── DATA ──────────────────────────────────────────────────────────────────────
const FILTER_OPTIONS = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories', 'Sale']

const NEW_ARRIVALS = [
  {
    id: '1',
    name: 'Structured Oversized Jacket',
    category: 'Outerwear · Men',
    price: 890000,
    badge: { label: 'New', color: '#1a1a1a' },
    swatches: ['#111', '#8B7355', '#D4CFC8'],
    img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Wide Leg Cargo Pant',
    category: 'Bottoms · Women',
    price: 650000,
    badge: null,
    swatches: ['#C4BEB7', '#4A4A4A', '#5C6B3A'],
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Essential Pullover Hoodie',
    category: 'Tops · Unisex',
    price: 420000,
    originalPrice: 600000,
    badge: { label: '−30%', color: '#D30005' },
    swatches: ['#222', '#F5F0E8', '#8B6F6F'],
    img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&h=800&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Canvas Studio Tote',
    category: 'Accessories',
    price: 480000,
    badge: { label: 'New', color: '#1a1a1a' },
    swatches: ['#D4CFC8', '#111', '#8B6F4E'],
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&auto=format&fit=crop',
  },
]

const BEST_SELLERS = [
  {
    id: '5',
    name: 'Relaxed Linen Shirt',
    category: 'Tops · Men',
    price: 540000,
    badge: null,
    swatches: ['#E8E4DC', '#4A5568', '#6B4A3E'],
    img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'Urban Runner Mono',
    category: 'Footwear · Unisex',
    price: 1200000,
    badge: { label: 'New', color: '#1a1a1a' },
    swatches: ['#111', '#FAFAFA'],
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&auto=format&fit=crop',
  },
  {
    id: '7',
    name: 'Ribbed Knit Sweater',
    category: 'Tops · Women',
    price: 384000,
    originalPrice: 480000,
    badge: { label: '−20%', color: '#D30005' },
    swatches: ['#8B6F6F', '#D4CFC8', '#4A5568'],
    img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&auto=format&fit=crop',
  },
  {
    id: '8',
    name: 'Logo 5-Panel Cap',
    category: 'Accessories',
    price: 280000,
    badge: null,
    swatches: ['#111', '#FAFAFA', '#4A5568'],
    img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=800&auto=format&fit=crop',
  },
]

const CATEGORIES = [
  {
    label: 'WOMEN',
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&auto=format&fit=crop',
  },
  {
    label: 'MEN',
    img: 'https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=600&h=800&auto=format&fit=crop',
  },
  {
    label: 'NEW IN',
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=800&auto=format&fit=crop',
  },
  {
    label: 'ACCESSORIES',
    img: 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=600&h=800&auto=format&fit=crop',
  },
]

const FEATURES = [
  {
    title: 'FREE SHIPPING',
    desc: 'Gratis ongkir untuk\npembelian di atas Rp500.000',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: 'EASY RETURNS',
    desc: 'Pengembalian mudah\ndalam 7 hari',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: 'SECURE PAYMENT',
    desc: 'Pembayaran aman dan\nterpercaya',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'CUSTOMER SERVICE',
    desc: 'Layanan pelanggan\n24/7 siap membantu',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
]

// ─── PRODUCT CARD COMPONENT ───────────────────────────────────────────────────
function ProductCard({ product }: { product: typeof NEW_ARRIVALS[0] }) {
  const cart = useCart()

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault() // jangan navigasi ke halaman produk
    cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: 'M',
      color: product.swatches[0],
      img: product.img,
    })
  }

  return (
    <Link href={`/products/${product.id}`} className="group block cursor-pointer" data-anim="product-card">
      <div className="relative bg-[#f0f0f0] aspect-[3/4] mb-3 overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <div
            className="absolute top-2.5 left-2.5 text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1"
            style={{ backgroundColor: product.badge.color }}
          >
            {product.badge.label}
          </div>
        )}
        {/* Tombol Add to Cart — muncul saat hover */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] text-white text-[11px] font-medium uppercase tracking-wider py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          + Tambah ke Keranjang
        </button>
      </div>
      <div className="text-[13px] font-medium mb-0.5">{product.name}</div>
      <div className="text-[11px] uppercase tracking-wider text-[#707072] mb-2">{product.category}</div>
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-[13px] font-medium"
          style={{ color: product.originalPrice ? '#D30005' : '#1a1a1a' }}
        >
          Rp {product.price.toLocaleString('id-ID')}
        </span>
        {product.originalPrice && (
          <span className="text-[11px] text-[#9E9EA0] line-through">
            Rp {product.originalPrice.toLocaleString('id-ID')}
          </span>
        )}
      </div>
      <div className="flex gap-1">
        {product.swatches.map((color, i) => (
          <div
            key={i}
            className="w-3.5 h-3.5 rounded-full border border-black/10"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </Link>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All')

  // Initialize all GSAP animations
  useGsapAnimations()

  return (
    <div style={{ backgroundColor: '#faf9f8', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>
      <div data-anim="navbar-wrapper">
        <Navbar />
      </div>

      {/* ── MOBILE-FIRST HOME SECTIONS (shown only on mobile) ──────── */}
      <MobileHomeSections />

      {/* ── DESKTOP / TABLET CONTENT (hidden on mobile) ──────────── */}
      <div className="hidden md:block">
      <section className="flex min-h-[60vh] md:min-h-[80vh]">
        <div className="flex-1 flex flex-col justify-center px-6 md:px-20 py-14 md:py-16">
          <p data-anim="hero-badge" className="text-[0.8rem] font-semibold uppercase tracking-[2px] mb-4 md:mb-5">
            NEW COLLECTION
          </p>
          <h1
            data-anim="hero-title"
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-[2.5rem] sm:text-5xl md:text-[5.5rem] leading-[1.1] font-normal mb-4 md:mb-5"
          >
            Elevate Your<br />Everyday Style
          </h1>
          <p data-anim="hero-desc" className="text-[#555] max-w-xs mb-7 md:mb-10 leading-relaxed text-[13px] md:text-sm">
            Temukan koleksi fashion terbaru yang elegan, nyaman dan penuh karakter.
          </p>
          <div data-anim="hero-cta">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-[#1a1a1a] text-white px-7 py-3.5 text-[0.85rem] font-medium uppercase tracking-[1px] hover:opacity-80 transition"
            >
              SHOP NOW <ArrowRight />
            </Link>
          </div>
        </div>
        <div
          data-anim="hero-image"
          className="flex-1 hidden md:block"
          style={{
            background: "url('/maskot.png') center / contain no-repeat",
          }}
        />
      </section>

      {/* ② SHOP BY CATEGORY ──────────────────────────────────────────── */}
      <div className="px-4 md:px-8 pt-12 md:pt-14 pb-2">
        <div className="flex items-baseline justify-between pb-5 md:pb-6">
          <h2
            data-anim="section-heading"
            className="text-2xl md:text-[32px] font-normal uppercase tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shop by Category
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              data-anim="category-tile"
              style={{ backgroundColor: '#f3efe9' }}
              className="flex flex-col pb-4 px-3 pt-3"
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="w-full object-cover mb-3"
                style={{ height: 'clamp(120px, 25vw, 200px)' }}
              />
              <h3 className="text-[0.85rem] font-semibold mb-1.5">{cat.label}</h3>
              <Link
                href="/products"
                className="text-[0.75rem] font-medium uppercase tracking-[0.5px] flex items-center gap-1 text-[#555] hover:text-[#1a1a1a] transition"
              >
                View Collection <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ③ FILTER RAIL + NEW ARRIVALS ────────────────────────────────── */}
      <div className="mt-12 md:mt-14">
        <div className="px-4 md:px-8 pb-5 md:pb-6 flex items-baseline justify-between">
          <h2
            data-anim="section-heading"
            className="text-[26px] md:text-[32px] font-normal uppercase tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            New Arrivals
          </h2>
          <Link
            href="/products"
            className="text-[11px] font-medium uppercase tracking-wider text-[#707072] border-b border-[#707072] pb-px hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition"
          >
            View All
          </Link>
        </div>
        <div
          className="flex items-center gap-2 px-4 md:px-8 py-4 overflow-x-auto scrollbar-none mb-6"
          style={{ borderTop: '1px solid #E8E8E8', borderBottom: '1px solid #E8E8E8' }}
        >
          <span className="text-[11px] font-medium uppercase tracking-wider text-[#707072] mr-2 whitespace-nowrap flex-shrink-0">
            Filter:
          </span>
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              className="inline-flex items-center h-11 md:h-9 px-4 rounded-full text-[12px] font-medium uppercase tracking-wider whitespace-nowrap transition flex-shrink-0"
              style={{
                border: activeFilter === opt ? '1px solid #111' : '1px solid #D8D8D8',
                backgroundColor: activeFilter === opt ? '#111' : '#fff',
                color: activeFilter === opt ? '#fff' : '#1a1a1a',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
        <div
          data-anim="product-grid"
          className="px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-3"
        >
          {NEW_ARRIVALS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* ④ CAMPAIGN TILES — Collections ─────────────────────────────── */}
      <div className="px-4 md:px-8 mt-12 md:mt-14">
        <div className="pb-5 md:pb-6">
          <h2
            data-anim="section-heading"
            className="text-[26px] md:text-[32px] font-normal uppercase tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Collections
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 md:mb-12">
          {/* Big tile */}
          <div
            data-anim="collection-tile"
            className="relative flex items-end p-5 md:p-6"
            style={{ aspectRatio: '4/3', background: '#1C1C1C', overflow: 'hidden' }}
          >
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop"
              alt="Dark Utility"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="relative z-10">
              <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/60 mb-1.5">
                Autumn / Winter 2026
              </p>
              <h3
                className="text-[32px] md:text-[40px] leading-[0.9] uppercase text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Dark<br />Utility
              </h3>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 bg-white text-[#111] text-[10px] font-medium uppercase tracking-wider px-4 py-2.5 rounded-full hover:bg-gray-100 transition"
              >
                Explore <ArrowRight size={10} />
              </Link>
            </div>
          </div>
          {/* Right: two stacked */}
          <div className="flex flex-col gap-3">
            <div
              data-anim="collection-tile"
              className="relative flex items-end p-5 md:p-6 overflow-hidden aspect-[4/3.2] md:aspect-[4/2.5]"
              style={{ background: '#E8E4DC' }}
            >
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&auto=format&fit=crop"
                alt="Soft Forms"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="relative z-10">
                <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#1a1a1a]/70 mb-1.5">
                  Women's
                </p>
                <h3
                  className="text-[24px] md:text-[28px] leading-[0.9] uppercase text-[#111] mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Soft<br />Forms
                </h3>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 bg-[#111] text-white text-[10px] font-medium uppercase tracking-wider px-4 py-2.5 rounded-full hover:opacity-80 transition"
                >
                  Shop <ArrowRight size={10} />
                </Link>
              </div>
            </div>
            <div
              data-anim="collection-tile"
              className="relative flex items-end p-5 md:p-6 overflow-hidden aspect-[4/3.2] md:aspect-[4/2.5]"
              style={{ background: '#111' }}
            >
              <div className="absolute inset-0 overflow-hidden select-none">
                <span
                  className="absolute text-[80px] font-bold text-white/5 leading-none top-2"
                  style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.1em' }}
                >
                  SALE SALE SALE
                </span>
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D30005]" />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/50 mb-1.5">
                  Up to 50% off
                </p>
                <h3
                  className="text-[24px] md:text-[28px] leading-[0.9] uppercase text-white mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  End of<br />Season
                </h3>
                <Link
                  href="/products?sale=true"
                  className="inline-flex items-center gap-1.5 bg-white text-[#111] text-[10px] font-medium uppercase tracking-wider px-4 py-2.5 rounded-full hover:bg-gray-100 transition"
                >
                  Shop Sale <ArrowRight size={10} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ⑤ FREE SHIPPING CTA STRIP ───────────────────────────────────── */}
      <div
        data-anim="cta-strip"
        className="flex flex-col md:flex-row items-center md:items-center text-center md:text-left justify-between gap-5 md:gap-6 px-6 md:px-8 py-10 md:py-8 bg-[#1a1a1a]"
      >
        <div data-anim="cta-text">
          <p
            className="text-lg md:text-[28px] text-white uppercase tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            FREE SHIPPING OVER RP 500.000
          </p>
          <p className="text-[12px] text-white/50 mt-1.5 tracking-wider">
            Delivered within 2–4 business days across Indonesia.
          </p>
        </div>
        <Link
          data-anim="cta-btn"
          href="/products"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-[#111] text-[12px] font-medium uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-gray-100 transition"
        >
          Shop Now <ArrowRight size={12} />
        </Link>
      </div>

      {/* ⑥ BEST SELLERS ──────────────────────────────────────────────── */}
      <div className="px-4 md:px-8 pt-12 md:pt-14">
        <div className="flex items-baseline justify-between pb-5 md:pb-6">
          <h2
            data-anim="section-heading"
            className="text-[26px] md:text-[32px] font-normal uppercase tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Best Sellers
          </h2>
          <Link
            href="/products"
            className="text-[11px] font-medium uppercase tracking-wider text-[#707072] border-b border-[#707072] pb-px hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition"
          >
            View All
          </Link>
        </div>
        <div
          data-anim="product-grid"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-3 mb-12 md:mb-14"
        >
          {BEST_SELLERS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* ⑦ SPRING COLLECTION BENTO ───────────────────────────────────── */}
      <div className="px-4 md:px-8 pb-0">
        <div
          data-anim="fade-up"
          style={{ backgroundColor: '#f3efe9' }}
          className="flex flex-col md:flex-row p-6 md:p-10 gap-6 md:gap-8 justify-between"
        >
          <div className="flex flex-col justify-center md:max-w-[280px]">
            <p className="text-[0.75rem] font-medium uppercase tracking-[2px] mb-3 md:mb-4 text-[#555]">NEW COLLECTION</p>
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-2xl md:text-3xl font-normal mb-3 md:mb-4 leading-[1.2]"
            >
              Spring / Summer<br />2024
            </h2>
            <p className="text-sm text-[#555] mb-6 md:mb-8 leading-relaxed">
              Koleksi terbaru yang terinspirasi dari keanggunan dan kenyamanan dalam setiap momen.
            </p>
            <Link
              href="/products"
              className="text-[0.8rem] font-semibold uppercase tracking-[0.5px] flex items-center gap-1 hover:text-[#888] transition"
            >
              EXPLORE COLLECTION <ArrowRight size={12} />
            </Link>
          </div>
          <div className="flex gap-2 md:gap-3 overflow-hidden" style={{ height: 'clamp(180px, 45vw, 320px)' }}>
            {[
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=700&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=700&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=700&auto=format&fit=crop',
            ].map((src, i) => (
              <img key={i} src={src} alt={`Spring ${i + 1}`} className={`object-cover flex-1 min-w-0 ${i === 2 ? 'hidden sm:block' : ''}`} style={{ height: '100%' }} />
            ))}
          </div>
        </div>
      </div>

      {/* ⑧ ABOUT US ──────────────────────────────────────────────────── */}
      <div className="px-4 md:px-8 py-5">
        <div
          data-anim="fade-up"
          style={{ backgroundColor: '#f3efe9' }}
          className="flex flex-col md:flex-row p-6 md:p-10 gap-8 md:gap-10"
        >
          <div className="flex-1">
            <p className="text-[0.75rem] font-medium uppercase tracking-[2px] mb-4 text-[#555]">ABOUT US</p>
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-2xl md:text-3xl font-normal mb-4 leading-[1.2]"
            >
              Fashion for<br />Every Version<br />of You
            </h2>
            <p className="text-sm text-[#555] mb-6 leading-relaxed max-w-sm">
              Kami percaya bahwa fashion bukan hanya tentang penampilan, tapi tentang bagaimana anda mengekspresikan diri dengan percaya diri.
            </p>
            <Link
              href="#about"
              className="text-[0.8rem] font-semibold uppercase tracking-[0.5px] flex items-center gap-1 hover:text-[#888] transition"
            >
              LEARN MORE <ArrowRight size={12} />
            </Link>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop"
              alt="Clothing Rack"
              className="w-full object-cover"
              style={{ height: 'clamp(200px, 50vw, 280px)', borderRadius: '140px 140px 0 0' }}
            />
          </div>
        </div>
      </div>

      {/* ⑨ FEATURES BAR — Reassurance ────────────────────────────────── */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 px-4 md:px-8 py-10 md:py-12"
        style={{ borderTop: '1px solid #eaeaea' }}
      >
        {FEATURES.map((f) => (
          <div key={f.title} data-anim="feature-item" className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            <div style={{ color: '#1a1a1a' }} className="flex-shrink-0">{f.icon}</div>
            <div>
              <h4 className="text-[0.8rem] md:text-[0.85rem] font-semibold mb-1">{f.title}</h4>
              <p className="text-[0.73rem] md:text-[0.78rem] text-[#555] whitespace-pre-line leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ⑩ FOOTER ────────────────────────────────────────────────────── */}
      <PageFooter />
      </div>{/* end desktop block */}
    </div>
  )
}
