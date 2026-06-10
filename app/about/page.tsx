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

const VALUES = [
  {
    title: 'Kualitas Tanpa Kompromi',
    desc: 'Setiap produk kami melewati seleksi ketat — dari pemilihan bahan hingga jahitan terakhir. Kami tidak mengorbankan kualitas demi harga.',
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Fashion yang Inklusif',
    desc: 'Kami percaya fashion adalah untuk semua orang. Koleksi kami dirancang untuk beragam bentuk tubuh, gaya, dan kesempatan.',
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Keberlanjutan',
    desc: 'Kami berkomitmen untuk mengurangi dampak lingkungan dengan menggunakan bahan ramah lingkungan dan praktik produksi yang bertanggung jawab.',
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Desain Lokal',
    desc: 'Lahir di Indonesia, terinspirasi dari kekayaan budaya dan estetika lokal yang dipadukan dengan sentuhan kontemporer global.',
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

const TEAM = [
  {
    name: 'Arya Santoso',
    role: 'Founder & Creative Director',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Dinda Rahayu',
    role: 'Head of Design',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Rizky Pratama',
    role: 'Brand & Marketing',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&auto=format&fit=crop&q=80',
  },
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from('[data-anim="about-hero"]', {
        y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
      })
      gsap.from('[data-anim="about-hero-img"]', {
        scale: 1.04, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.3,
      })

      // Fade up sections
      gsap.utils.toArray<HTMLElement>('[data-anim="fade-up"]').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
        })
      })

      // Values cards stagger
      gsap.utils.toArray<HTMLElement>('[data-anim="value-card"]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          y: 40, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
        })
      })

      // Team cards stagger
      gsap.utils.toArray<HTMLElement>('[data-anim="team-card"]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          y: 50, opacity: 0, duration: 0.6, delay: i * 0.12, ease: 'power3.out',
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

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="flex flex-col md:flex-row min-h-[60vh] md:min-h-[70vh]">
        {/* Text */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-12 md:py-16">
          <div data-anim="about-hero">
            <p className="text-[0.75rem] font-medium uppercase tracking-[2px] mb-4 md:mb-5 text-[#555]">
              About Us
            </p>
            <h1
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-[2.2rem] md:text-[3.5rem] font-normal leading-[1.1] mb-5 md:mb-6"
            >
              Fashion for<br />Every Version<br />of You
            </h1>
            <p className="text-sm text-[#555] max-w-sm leading-relaxed mb-7 md:mb-8">
              Vogueir lahir dari keyakinan bahwa fashion bukan hanya soal penampilan — ini tentang bagaimana Anda mengekspresikan diri, dengan percaya diri, setiap hari.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-[0.82rem] font-medium uppercase tracking-wider px-6 py-3.5 hover:opacity-80 transition"
            >
              Shop Now <ArrowRight />
            </Link>
          </div>
        </div>
        {/* Image */}
        <div className="flex-1 min-h-[280px] md:min-h-0 overflow-hidden">
          <img
            data-anim="about-hero-img"
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop"
            alt="About Vogueir"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 py-12 md:py-20"
        style={{ backgroundColor: '#f3efe9' }}
      >
        <div data-anim="fade-up" className="max-w-2xl">
          <p className="text-[0.75rem] font-medium uppercase tracking-[2px] mb-5 text-[#555]">
            Our Story
          </p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl md:text-[2.5rem] font-normal leading-[1.2] mb-6"
          >
            Dimulai dari Sebuah Lemari Kosong
          </h2>
          <p className="text-sm text-[#555] leading-relaxed mb-4">
            Vogueir didirikan pada 2021 dengan satu pertanyaan sederhana: kenapa sulit mencari pakaian yang sekaligus bagus, nyaman, dan terjangkau di Indonesia?
          </p>
          <p className="text-sm text-[#555] leading-relaxed mb-4">
            Dari garasi kecil di Jakarta, kami mulai merancang potongan-potongan yang merayakan kesederhanaan — wardrobe essentials yang bisa dipakai hari demi hari, tanpa kehilangan karakter.
          </p>
          <p className="text-sm text-[#555] leading-relaxed">
            Hari ini, Vogueir melayani ribuan pelanggan di seluruh Indonesia dengan koleksi yang terus berkembang, selalu dengan satu prinsip: fashion yang memberdayakan.
          </p>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <section data-anim="fade-up" className="px-6 md:px-16 py-10 md:py-14" style={{ borderBottom: '1px solid #eaeaea' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { value: '2021', label: 'Tahun Berdiri' },
            { value: '50K+', label: 'Pelanggan Puas' },
            { value: '200+', label: 'Produk Aktif' },
            { value: '34', label: 'Kota Terjangkau' },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-[2rem] md:text-[2.5rem] font-normal leading-none mb-2"
              >
                {stat.value}
              </p>
              <p className="text-[12px] uppercase tracking-wider text-[#707072]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-12 md:py-16">
        <div data-anim="fade-up" className="mb-10">
          <p className="text-[0.75rem] font-medium uppercase tracking-[2px] mb-4 text-[#555]">What We Stand For</p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl font-normal"
          >
            Nilai-Nilai Kami
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VALUES.map((v) => (
            <div
              key={v.title}
              data-anim="value-card"
              className="flex gap-5 p-6"
              style={{ backgroundColor: '#f3efe9' }}
            >
              <div className="flex-shrink-0 mt-0.5" style={{ color: '#1a1a1a' }}>{v.icon}</div>
              <div>
                <h3 className="text-[15px] font-semibold mb-2">{v.title}</h3>
                <p className="text-[13px] text-[#555] leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-12 md:py-16" style={{ backgroundColor: '#f3efe9' }}>
        <div data-anim="fade-up" className="mb-8 md:mb-10">
          <p className="text-[0.75rem] font-medium uppercase tracking-[2px] mb-4 text-[#555]">The People</p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl font-normal"
          >
            Tim Kami
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-5">
          {TEAM.map((member) => (
            <div key={member.name} data-anim="team-card">
              <div className="overflow-hidden mb-4" style={{ aspectRatio: '1/1' }}>
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-[15px] font-semibold mb-1">{member.name}</h3>
              <p className="text-[12px] uppercase tracking-wider text-[#707072]">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section
        data-anim="fade-up"
        className="px-6 md:px-16 py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-6 bg-[#1a1a1a]"
      >
        <div>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-[26px] md:text-[32px] text-white font-normal uppercase tracking-wider mb-2"
          >
            Jadilah Bagian dari Keluarga Kami
          </h2>
          <p className="text-[13px] text-white/50 tracking-wide">Ikuti kami di media sosial dan dapatkan update koleksi terbaru.</p>
        </div>
        <Link
          href="/contact"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-[#111] text-[12px] font-medium uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-gray-100 transition"
        >
          Hubungi Kami <ArrowRight size={12} />
        </Link>
      </section>

      <PageFooter />
    </div>
  )
}
