'use client'

import { Navbar } from '@/components/navbar'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// ─── DATA ─────────────────────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  { id: '1', name: 'Structured Oversized Jacket', category: "Women's", price: 890000, badge: 'New', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&auto=format&fit=crop', swatches: ['#111', '#8B7355', '#D4CFC8'] },
  { id: '2', name: 'Wide Leg Cargo Pant', category: "Women's", price: 650000, badge: null, img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&auto=format&fit=crop', swatches: ['#C4BEB7', '#4A4A4A'] },
  { id: '3', name: 'Essential Pullover Hoodie', category: "Men's", price: 420000, originalPrice: 600000, badge: '−30%', img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&h=800&auto=format&fit=crop', swatches: ['#222', '#F5F0E8'] },
  { id: '4', name: 'Canvas Studio Tote', category: 'Accessories', price: 480000, badge: 'New', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&auto=format&fit=crop', swatches: ['#D4CFC8', '#111'] },
  { id: '5', name: 'Relaxed Linen Shirt', category: "Men's", price: 540000, badge: null, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&auto=format&fit=crop', swatches: ['#E8E4DC', '#4A5568'] },
  { id: '6', name: 'Urban Runner Mono', category: 'Accessories', price: 1200000, badge: 'New', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&auto=format&fit=crop', swatches: ['#111', '#FAFAFA'] },
  { id: '7', name: 'Ribbed Knit Sweater', category: "Women's", price: 384000, originalPrice: 480000, badge: '−20%', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&auto=format&fit=crop', swatches: ['#8B6F6F', '#D4CFC8'] },
  { id: '8', name: 'Logo 5-Panel Cap', category: 'Accessories', price: 280000, badge: null, img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=800&auto=format&fit=crop', swatches: ['#111', '#FAFAFA'] },
]

const FILTER_OPTIONS = ['All', "Women's", "Men's", 'Accessories']
const SORT_OPTIONS   = ['Terbaru', 'Harga: Terendah', 'Harga: Tertinggi']

const QUICK_CATS = [
  { label: 'Women',       filter: "Women's",     img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=400&auto=format&fit=crop' },
  { label: 'Men',         filter: "Men's",       img: 'https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=300&h=400&auto=format&fit=crop' },
  { label: 'Accessories', filter: 'Accessories', img: 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=300&h=400&auto=format&fit=crop' },
  { label: 'New In',      filter: 'All',         img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=400&auto=format&fit=crop' },
]

const HERO_IMGS = [
  { src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=700&auto=format&fit=crop', alt: 'Jacket' },
  { src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=700&auto=format&fit=crop', alt: 'Women' },
  { src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=700&auto=format&fit=crop', alt: 'Shoes' },
]

// ─── SHARED ICON ──────────────────────────────────────────────────────────────
function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function PageFooter() {
  return (
    <footer style={{ borderTop: '1px solid #E8E8E8', backgroundColor: '#faf9f8' }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-8 py-10">
        {[
          { title: 'Company', links: ['About Vogueir', 'Careers', 'Press', 'Sustainability'] },
          { title: 'Help',    links: ['FAQ', 'Returns', 'Size Guide', 'Track Order'] },
          { title: 'Shop',    links: ['New Arrivals', 'Women', 'Men', 'Sale'] },
          { title: 'Follow',  links: ['Instagram', 'TikTok', 'Pinterest'] },
        ].map((col) => (
          <div key={col.title}>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#1a1a1a' }}>{col.title}</h3>
            <ul className="space-y-1.5">
              {col.links.map((l) => (
                <li key={l}><a href="#" className="text-[12px] text-[#707072] hover:text-[#1a1a1a] transition block">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 px-6 md:px-8 py-5" style={{ borderTop: '1px solid #E8E8E8' }}>
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-base font-semibold tracking-[3px] uppercase">VOGUEIR</span>
          <span className="hidden md:inline text-[#9E9EA0] mx-1">·</span>
          <span className="text-[11px] text-[#9E9EA0] tracking-wider">© 2024 Vogueir Fashion. All rights reserved.</span>
        </div>
        <span className="text-[11px] text-[#9E9EA0] tracking-wider">Privacy · Terms · Cookies</span>
      </div>
    </footer>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [selectedSort, setSelectedSort]     = useState('Terbaru')
  const [products, setProducts]             = useState(ALL_PRODUCTS)

  useEffect(() => {
    let filtered = [...ALL_PRODUCTS]
    if (selectedFilter !== 'All') filtered = filtered.filter(p => p.category === selectedFilter)
    if (selectedSort === 'Harga: Terendah') filtered.sort((a, b) => a.price - b.price)
    else if (selectedSort === 'Harga: Tertinggi') filtered.sort((a, b) => b.price - a.price)
    setProducts(filtered)
  }, [selectedFilter, selectedSort])

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf9f8', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — mobile & desktop rendered separately
          ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid #eaeaea' }}>

        {/* ─── MOBILE HERO ────────────────────────────────────────────────── */}
        <div className="md:hidden">

          {/* Headline */}
          <div className="px-4 pt-7 pb-4">
            <p className="text-[0.7rem] font-medium uppercase tracking-[2.5px] mb-2 text-[#707072]">Koleksi Kami · SS'26</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[1.85rem] font-normal leading-[1.1]">
              All Products
            </h1>
          </div>

          {/* Image duo — pushed right */}
          <div className="pb-4 flex gap-1.5 ml-auto" style={{ height: 180, width: '75%' }}>
            <div className="relative overflow-hidden flex-[1.2]">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&auto=format&fit=crop"
                alt="Women's collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%)' }} />
              <span className="absolute bottom-2 left-2 text-[9px] font-semibold uppercase tracking-wider text-white">Women</span>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="relative overflow-hidden flex-1">
                <img
                  src="https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&h=300&auto=format&fit=crop"
                  alt="Men's collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)' }} />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-semibold uppercase tracking-wider text-white">Men</span>
              </div>
              <div className="relative overflow-hidden flex-1">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&auto=format&fit=crop"
                  alt="Accessories"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)' }} />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-semibold uppercase tracking-wider text-white">Accessories</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="px-4 pb-4 flex items-center gap-5">
            {[
              { val: `${ALL_PRODUCTS.length}+`, lbl: 'Produk' },
              { val: '4',      lbl: 'Kategori' },
              { val: "SS'26",  lbl: 'Koleksi' },
            ].map(({ val, lbl }, i, arr) => (
              <div key={lbl} className="flex items-center gap-5">
                <div className="flex flex-col">
                  <span className="text-[1.05rem] font-semibold leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>{val}</span>
                  <span className="text-[9.5px] uppercase tracking-widest text-[#707072] mt-0.5">{lbl}</span>
                </div>
                {i < arr.length - 1 && <div className="w-px h-6 bg-[#e0e0e0]" />}
              </div>
            ))}
          </div>

          {/* Quick-browse chips */}
          <div className="px-4 pb-5 pt-1 flex items-center gap-2 overflow-x-auto scrollbar-none flex-nowrap">
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#707072] whitespace-nowrap flex-shrink-0 mr-0.5">Browse:</span>
            {QUICK_CATS.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedFilter(cat.filter)}
                className="flex-shrink-0 h-8 px-3.5 text-[11px] font-medium uppercase tracking-wider transition whitespace-nowrap"
                style={{
                  border: selectedFilter === cat.filter ? '1px solid #111' : '1px solid #D8D8D8',
                  backgroundColor: selectedFilter === cat.filter ? '#111' : '#fff',
                  color: selectedFilter === cat.filter ? '#fff' : '#1a1a1a',
                }}
              >
                {cat.label}
              </button>
            ))}
            <div className="w-px h-5 bg-[#e0e0e0] flex-shrink-0" />
            <button
              onClick={() => setSelectedFilter('All')}
              className="flex-shrink-0 h-8 px-3.5 text-[11px] font-medium uppercase tracking-wider text-white whitespace-nowrap"
              style={{ backgroundColor: '#D30005' }}
            >
              Sale
            </button>
          </div>
        </div>

        {/* ─── DESKTOP HERO ───────────────────────────────────────────────── */}
        {/*
            2-ROW LAYOUT — tiap layer punya ruang sendiri:
            Row 1: headline kiri  |  triptych foto kanan  (full height)
            Row 2: stats  |  divider  |  category tiles  (strip tipis)
        */}
        <div className="hidden md:block">

          {/* ROW 1 — headline + triptych */}
          <div className="flex" style={{ minHeight: 340 }}>

            {/* Kiri: hanya headline + satu kalimat — sangat bernapas */}
            <div className="flex flex-col justify-center px-16 py-16 flex-1">
              <p className="text-[0.7rem] font-medium uppercase tracking-[2.5px] mb-6 text-[#707072]">
                Koleksi Kami · Spring / Summer 2026
              </p>
              <h1
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-[4.5rem] font-normal leading-[1.0] mb-6"
              >
                All<br />Products
              </h1>
              <p className="text-[14px] text-[#555] leading-relaxed max-w-[380px]">
                Temukan koleksi fashion terbaru yang elegan, nyaman, dan penuh karakter — dipilih untuk setiap momen.
              </p>
            </div>

            {/* Kanan: triptych foto — staggered vertikal */}
            <div className="flex gap-2 overflow-hidden flex-shrink-0" style={{ width: 520 }}>
              {HERO_IMGS.map(({ src, alt }, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden flex-1"
                  style={{
                    marginTop:    i === 1 ? '-28px' : '28px',
                    marginBottom: i === 1 ? '28px'  : '-28px',
                  }}
                >
                  <img src={src} alt={alt} className="w-full h-full object-cover" />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 52%)' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ROW 2 — stats + category tiles dalam strip horizontal */}
          <div
            className="flex items-center px-16 py-8"
            style={{ borderTop: '1px solid #eaeaea' }}
          >
            {/* Stats */}
            <div className="flex items-center gap-12 flex-shrink-0">
              {[
                { val: `${ALL_PRODUCTS.length}+`, lbl: 'Produk' },
                { val: '4',      lbl: 'Kategori' },
                { val: "SS'26",  lbl: 'Koleksi' },
              ].map(({ val, lbl }, i, arr) => (
                <div key={lbl} className="flex items-center gap-12">
                  <div className="flex flex-col">
                    <span
                      className="text-[2.1rem] font-semibold leading-none"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {val}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#707072] mt-2">{lbl}</span>
                  </div>
                  {i < arr.length - 1 && <div className="w-px h-10 bg-[#e0e0e0]" />}
                </div>
              ))}
            </div>

            {/* Vertical divider */}
            <div className="w-px self-stretch bg-[#eaeaea] mx-14 flex-shrink-0" />

            {/* Category quick-browse */}
            <div className="flex flex-col">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[#707072] mb-3">Browse by Category</p>
              <div className="flex gap-3 items-center">
                {QUICK_CATS.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => setSelectedFilter(cat.filter)}
                    className="group relative overflow-hidden flex-shrink-0"
                    style={{
                      width: 88,
                      height: 104,
                      backgroundColor: '#f3efe9',
                      outline: selectedFilter === cat.filter ? '2px solid #1a1a1a' : '2px solid transparent',
                      outlineOffset: '2px',
                      transition: 'outline-color 0.2s',
                    }}
                    aria-label={`Filter ${cat.label}`}
                  >
                    <img
                      src={cat.img}
                      alt={cat.label}
                      className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 flex items-end justify-center pb-2.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1a1a1a] text-center leading-tight">
                        {cat.label}
                      </span>
                    </div>
                  </button>
                ))}
                <div className="w-px h-14 bg-[#e8e8e8] mx-2 flex-shrink-0" />
                <button
                  onClick={() => setSelectedFilter('All')}
                  className="flex-shrink-0 self-center h-10 px-5 text-[11px] font-medium uppercase tracking-wider text-white flex items-center gap-2 transition hover:opacity-85"
                  style={{ backgroundColor: '#D30005' }}
                >
                  Sale <ArrowRight size={10} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FILTERS & SORT
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="px-4 md:px-8 py-4 md:py-5" style={{ borderBottom: '1px solid #eaeaea' }}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 md:pb-0 flex-nowrap">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#707072] mr-1 whitespace-nowrap flex-shrink-0">Category:</span>
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className="inline-flex items-center h-11 md:h-9 px-4 rounded-full text-[12px] font-medium uppercase tracking-wider transition flex-shrink-0 whitespace-nowrap"
                style={{
                  border: selectedFilter === f ? '1px solid #111' : '1px solid #D8D8D8',
                  backgroundColor: selectedFilter === f ? '#111' : '#fff',
                  color: selectedFilter === f ? '#fff' : '#1a1a1a',
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#707072]">Sort:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="h-11 md:h-9 px-3 border text-[12px] font-medium focus:outline-none focus:border-[#1a1a1a] bg-white"
              style={{ border: '1px solid #D8D8D8', color: '#1a1a1a' }}
            >
              {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PRODUCTS GRID
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="flex-1 px-4 md:px-8 py-8 md:py-10">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#555] mb-6">Tidak ada produk di kategori ini.</p>
            <button onClick={() => setSelectedFilter('All')} className="text-[12px] font-medium uppercase tracking-wider underline">
              Tampilkan Semua
            </button>
          </div>
        ) : (
          <>
            <p className="text-[11px] uppercase tracking-widest text-[#707072] mb-5 md:mb-6">
              Menampilkan {products.length} produk
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {products.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="group block">
                  <div className="relative bg-[#f0f0f0] aspect-[3/4] mb-3 overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {p.badge && (
                      <div
                        className="absolute top-2.5 left-2.5 text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1"
                        style={{ backgroundColor: p.badge.startsWith('−') ? '#D30005' : '#1a1a1a' }}
                      >
                        {p.badge}
                      </div>
                    )}
                  </div>
                  <div className="text-[13px] font-medium mb-0.5">{p.name}</div>
                  <div className="text-[11px] uppercase tracking-wider text-[#707072] mb-2">{p.category}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[13px] font-medium" style={{ color: p.originalPrice ? '#D30005' : '#1a1a1a' }}>
                      Rp {p.price.toLocaleString('id-ID')}
                    </span>
                    {p.originalPrice && (
                      <span className="text-[11px] text-[#9E9EA0] line-through">
                        Rp {p.originalPrice.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {p.swatches.map((c, i) => (
                      <div key={i} className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      <PageFooter />
    </div>
  )
}
