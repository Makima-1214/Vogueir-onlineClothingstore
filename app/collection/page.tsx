'use client'

import { Navbar } from '@/components/navbar'
import { PageFooter } from '@/components/page-footer'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

const COLLECTIONS = [
  {
    season: 'Autumn / Winter 2026',
    name: 'Dark Utility',
    desc: 'Siluet tegas, palet gelap, dan material tahan lama untuk hari-hari yang penuh gerak.',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop',
    bg: '#1C1C1C',
    dark: true,
    href: '/products',
  },
  {
    season: "Women's",
    name: 'Soft Forms',
    desc: 'Potongan feminin yang flowy dengan nuansa warna lembut dan kain berkualitas tinggi.',
    img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&auto=format&fit=crop',
    bg: '#E8E4DC',
    dark: false,
    href: '/products',
  },
  {
    season: 'Spring / Summer 2024',
    name: 'Coastal Breeze',
    desc: 'Terinspirasi dari keindahan pantai — ringan, cerah, dan bebas.',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop',
    bg: '#DDE8E4',
    dark: false,
    href: '/products',
  },
  {
    season: "Men's Essentials",
    name: 'Refined Basics',
    desc: 'Wardrobe staple pria modern — bersih, serbaguna, dan tetap stylish.',
    img: 'https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=900&auto=format&fit=crop',
    bg: '#2C2C2C',
    dark: true,
    href: '/products',
  },
  {
    season: 'Limited Edition',
    name: 'Urban Monochrome',
    desc: 'Koleksi terbatas — satu palet, ribuan gaya. Hitam dan putih yang tak pernah salah.',
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&auto=format&fit=crop',
    bg: '#111',
    dark: true,
    href: '/products',
  },
  {
    season: 'Accessories 2024',
    name: 'The Carry-All',
    desc: 'Tas, topi, dan aksesori yang melengkapi setiap outfit dengan sempurna.',
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&auto=format&fit=crop',
    bg: '#F3EFE9',
    dark: false,
    href: '/products',
  },
]

export default function CollectionPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero heading
      gsap.from('[data-anim="col-hero"]', {
        y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
      })

      // Each collection card
      gsap.utils.toArray<HTMLElement>('[data-anim="col-card"]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          y: 60, opacity: 0, duration: 0.7, delay: (i % 2) * 0.1, ease: 'power3.out',
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: '#faf9f8', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}
      className="min-h-screen flex flex-col"
    >
      <Navbar />

      {/* Hero */}
      <section
        className="px-6 md:px-8 py-14 md:py-20"
        style={{ borderBottom: '1px solid #eaeaea' }}
      >
        <div data-anim="col-hero">
          <p className="text-[0.75rem] font-medium uppercase tracking-[2px] mb-4 text-[#555]">
            Vogueir
          </p>
          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-4xl md:text-[3.5rem] font-normal leading-[1.1] mb-4"
          >
            Our Collections
          </h1>
          <p className="text-sm text-[#555] max-w-md leading-relaxed">
            Setiap koleksi adalah cerita — dari konsep hingga kain, dari runway hingga lemari pakaian kamu.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="flex-1 px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COLLECTIONS.map((col, i) => {
            const isWide = i === 0 // first card spans full width on desktop
            return (
              <div
                key={col.name}
                data-anim="col-card"
                className={`relative flex items-end p-7 overflow-hidden group${isWide ? ' md:col-span-2' : ''}`}
                style={{
                  background: col.bg,
                  minHeight: isWide ? '420px' : '320px',
                }}
              >
                <img
                  src={col.img}
                  alt={col.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: col.dark ? 0.35 : 0.45 }}
                />
                <div className="relative z-10 max-w-md">
                  <p
                    className="text-[10px] font-medium uppercase tracking-[0.15em] mb-2"
                    style={{ color: col.dark ? 'rgba(255,255,255,0.55)' : 'rgba(26,26,26,0.6)' }}
                  >
                    {col.season}
                  </p>
                  <h2
                    className={`font-normal uppercase leading-[0.9] mb-3 ${isWide ? 'text-[52px]' : 'text-[32px]'}`}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: col.dark ? '#fff' : '#111',
                    }}
                  >
                    {col.name}
                  </h2>
                  <p
                    className="text-[13px] mb-5 leading-relaxed max-w-xs"
                    style={{ color: col.dark ? 'rgba(255,255,255,0.65)' : 'rgba(26,26,26,0.65)' }}
                  >
                    {col.desc}
                  </p>
                  <Link
                    href={col.href}
                    className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider px-5 py-2.5 rounded-full transition"
                    style={{
                      backgroundColor: col.dark ? '#fff' : '#111',
                      color: col.dark ? '#111' : '#fff',
                    }}
                  >
                    Explore Collection <ArrowRight size={10} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <PageFooter />
    </div>
  )
}
