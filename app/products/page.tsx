'use client'

import { Navbar } from '@/components/navbar'
import { useState, useEffect } from 'react'
import Link from 'next/link'

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
const SORT_OPTIONS = ['Terbaru', 'Harga: Terendah', 'Harga: Tertinggi']

function PageFooter() {
  return (
    <footer style={{ borderTop: '1px solid #E8E8E8', backgroundColor: '#faf9f8' }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-8 py-10">
        {[
          { title: 'Company', links: ['About Vogueir', 'Careers', 'Press', 'Sustainability'] },
          { title: 'Help', links: ['FAQ', 'Returns', 'Size Guide', 'Track Order'] },
          { title: 'Shop', links: ['New Arrivals', 'Women', 'Men', 'Sale'] },
          { title: 'Follow', links: ['Instagram', 'TikTok', 'Pinterest'] },
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

export default function ProductsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [selectedSort, setSelectedSort] = useState('Terbaru')
  const [products, setProducts] = useState(ALL_PRODUCTS)

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

      {/* Page Header */}
      <section className="px-6 md:px-8 py-10 md:py-14" style={{ borderBottom: '1px solid #eaeaea' }}>
        <p className="text-[0.75rem] font-medium uppercase tracking-[2px] mb-3 text-[#555]">Koleksi Kami</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-normal mb-2">
          All Products
        </h1>
        <p className="text-sm text-[#555]">Jelajahi seluruh koleksi fashion kami</p>
      </section>

      {/* Filters & Sort */}
      <section className="px-6 md:px-8 py-5" style={{ borderBottom: '1px solid #eaeaea' }}>
        <div className="flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#707072] mr-1">Category:</span>
            {FILTER_OPTIONS.map((f) => (
              <button key={f} onClick={() => setSelectedFilter(f)}
                className="inline-flex items-center h-9 px-4 rounded-full text-[12px] font-medium uppercase tracking-wider transition"
                style={{ border: selectedFilter === f ? '1px solid #111' : '1px solid #D8D8D8', backgroundColor: selectedFilter === f ? '#111' : '#fff', color: selectedFilter === f ? '#fff' : '#1a1a1a' }}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#707072]">Sort:</span>
            <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}
              className="h-9 px-3 border text-[12px] font-medium focus:outline-none focus:border-[#1a1a1a] bg-white"
              style={{ border: '1px solid #D8D8D8', color: '#1a1a1a' }}>
              {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="flex-1 px-6 md:px-8 py-10">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#555] mb-6">Tidak ada produk di kategori ini.</p>
            <button onClick={() => setSelectedFilter('All')} className="text-[12px] font-medium uppercase tracking-wider underline">Tampilkan Semua</button>
          </div>
        ) : (
          <>
            <p className="text-[11px] uppercase tracking-widest text-[#707072] mb-6">
              Menampilkan {products.length} produk
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {products.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="group block">
                  <div className="relative bg-[#f0f0f0] aspect-[3/4] mb-3 overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {p.badge && (
                      <div className="absolute top-2.5 left-2.5 text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1"
                        style={{ backgroundColor: p.badge.startsWith('−') ? '#D30005' : '#1a1a1a' }}>
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
                      <span className="text-[11px] text-[#9E9EA0] line-through">Rp {p.originalPrice.toLocaleString('id-ID')}</span>
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
