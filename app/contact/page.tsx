'use client'

import { Navbar } from '@/components/navbar'
import { PageFooter } from '@/components/page-footer'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CONTACT_INFO = [
  {
    title: 'Email',
    value: 'hello@vogueir.id',
    desc: 'Kami membalas dalam 1×24 jam.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'WhatsApp',
    value: '+62 812-3456-7890',
    desc: 'Senin–Sabtu, 09.00–18.00 WIB.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: 'Instagram',
    value: '@vogueir.id',
    desc: 'DM kami untuk kolaborasi & info koleksi.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Alamat',
    value: 'Jl. Kemang Raya No. 88, Jakarta Selatan',
    desc: 'Showroom buka Senin–Sabtu, 10.00–20.00.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

const FAQ = [
  {
    q: 'Berapa lama pengiriman ke luar Jawa?',
    a: 'Pengiriman ke luar Jawa memakan waktu 3–7 hari kerja tergantung kurir dan lokasi tujuan.',
  },
  {
    q: 'Bagaimana cara mengembalikan barang?',
    a: 'Pengembalian dapat dilakukan dalam 7 hari setelah barang diterima. Hubungi kami via email atau WhatsApp untuk memulai proses return.',
  },
  {
    q: 'Apakah ada toko fisik?',
    a: 'Ya, showroom kami berada di Jakarta Selatan. Buka Senin–Sabtu pukul 10.00–20.00 WIB.',
  },
  {
    q: 'Bisakah saya mengubah atau membatalkan pesanan?',
    a: 'Pesanan dapat dibatalkan atau diubah dalam 2 jam setelah pemesanan. Setelah itu, pesanan sudah masuk proses packing.',
  },
]

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="contact-hero"]', {
        y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
      })
      gsap.utils.toArray<HTMLElement>('[data-anim="fade-up"]').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
        })
      })
      gsap.utils.toArray<HTMLElement>('[data-anim="info-card"]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          y: 35, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormStatus('sending')
    // Simulate async submission
    setTimeout(() => setFormStatus('sent'), 1400)
  }

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: '#faf9f8', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}
      className="min-h-screen flex flex-col"
    >
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-14 md:py-20" style={{ borderBottom: '1px solid #eaeaea' }}>
        <div data-anim="contact-hero">
          <p className="text-[0.75rem] font-medium uppercase tracking-[2px] mb-4 text-[#555]">Kami Siap Membantu</p>
          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-4xl md:text-[3.5rem] font-normal leading-[1.1] mb-4"
          >
            Hubungi Kami
          </h1>
          <p className="text-sm text-[#555] max-w-md leading-relaxed">
            Ada pertanyaan tentang produk, pesanan, atau sekadar ingin menyapa? Tim kami dengan senang hati membantu kamu.
          </p>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ───────────────────────────────────── */}
      <section className="px-6 md:px-16 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {CONTACT_INFO.map((item) => (
            <div
              key={item.title}
              data-anim="info-card"
              className="p-6 flex flex-col gap-4"
              style={{ backgroundColor: '#f3efe9' }}
            >
              <div style={{ color: '#1a1a1a' }}>{item.icon}</div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#707072] mb-1">{item.title}</p>
                <p className="text-[14px] font-medium mb-1">{item.value}</p>
                <p className="text-[12px] text-[#555]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORM + FAQ ───────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div data-anim="fade-up">
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-2xl font-normal mb-6"
            >
              Kirim Pesan
            </h2>

            {formStatus === 'sent' ? (
              <div className="p-8 text-center" style={{ backgroundColor: '#f3efe9' }}>
                <svg className="mx-auto mb-4" width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-xl font-normal mb-2"
                >
                  Pesan Terkirim!
                </h3>
                <p className="text-[13px] text-[#555] mb-5">
                  Terima kasih sudah menghubungi kami. Kami akan segera membalas pesan kamu.
                </p>
                <button
                  onClick={() => { setFormStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="text-[12px] font-medium uppercase tracking-wider underline hover:text-[#555] transition"
                >
                  Kirim pesan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5 text-[#555]">
                      Nama
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Nama lengkap"
                      className="w-full h-11 px-4 text-[13px] bg-white focus:outline-none focus:border-[#1a1a1a] transition"
                      style={{ border: '1px solid #D8D8D8' }}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5 text-[#555]">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="email@kamu.com"
                      className="w-full h-11 px-4 text-[13px] bg-white focus:outline-none focus:border-[#1a1a1a] transition"
                      style={{ border: '1px solid #D8D8D8' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5 text-[#555]">
                    Subjek
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    placeholder="Topik pesan kamu"
                    className="w-full h-11 px-4 text-[13px] bg-white focus:outline-none focus:border-[#1a1a1a] transition"
                    style={{ border: '1px solid #D8D8D8' }}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5 text-[#555]">
                    Pesan
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tulis pesan kamu di sini..."
                    className="w-full px-4 py-3 text-[13px] bg-white focus:outline-none focus:border-[#1a1a1a] transition resize-none"
                    style={{ border: '1px solid #D8D8D8' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="h-12 bg-[#1a1a1a] text-white text-[12px] font-medium uppercase tracking-wider hover:opacity-80 transition disabled:opacity-50"
                >
                  {formStatus === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div data-anim="fade-up">
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-2xl font-normal mb-6"
            >
              Pertanyaan Umum
            </h2>
            <div className="flex flex-col">
              {FAQ.map((item, i) => (
                <div key={i} style={{ borderBottom: '1px solid #E8E8E8' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-4 text-left hover:text-[#555] transition"
                  >
                    <span className="text-[14px] font-medium pr-4">{item.q}</span>
                    <span className="flex-shrink-0 text-lg leading-none" style={{ transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>
                      +
                    </span>
                  </button>
                  {openFaq === i && (
                    <p className="text-[13px] text-[#555] pb-4 leading-relaxed pr-6">{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  )
}
