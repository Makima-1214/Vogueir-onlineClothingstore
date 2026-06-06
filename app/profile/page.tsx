'use client'

import { Navbar } from '@/components/navbar'
import { useSession, signOut } from '@/lib/auth-client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, Package, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [orders] = useState<any[]>([])

  useEffect(() => {
    if (!isPending && !session?.user) router.push('/sign-in')
  }, [session, isPending, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf9f8' }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[#707072] text-sm">Memuat...</p>
        </div>
      </div>
    )
  }

  if (!session?.user) return null

  const navItems = [
    { label: 'Detail Akun', href: '/profile' },
    { label: 'Riwayat Pesanan', href: '/profile/orders' },
    { label: 'Item Tersimpan', href: '/profile/saved' },
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf9f8', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* Header */}
      <section className="px-6 md:px-8 py-10 md:py-14" style={{ borderBottom: '1px solid #eaeaea' }}>
        <p className="text-[0.75rem] font-medium uppercase tracking-[2px] mb-3 text-[#555]">Akun Saya</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-normal mb-1">
          Halo, {session.user.name?.split(' ')[0]}
        </h1>
        <p className="text-sm text-[#555]">{session.user.email}</p>
      </section>

      {/* Main */}
      <section className="flex-1 px-6 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl">

          {/* Sidebar */}
          <div className="md:col-span-1">
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6 p-5" style={{ backgroundColor: '#f3efe9' }}>
              <div className="w-12 h-12 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-lg font-medium flex-shrink-0">
                {session.user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-[13px] font-medium truncate">{session.user.name}</p>
                <p className="text-[11px] text-[#707072] truncate">{session.user.email}</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="space-y-0.5">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href}
                  className="block px-4 py-3 text-[12px] font-medium uppercase tracking-wider hover:bg-[#f3efe9] transition"
                  style={{ color: '#1a1a1a' }}>
                  {item.label}
                </Link>
              ))}
              <button onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-4 py-3 text-[12px] font-medium uppercase tracking-wider hover:bg-[#f3efe9] transition text-left text-[#D30005]">
                <LogOut size={13} /> Keluar
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-10">

            {/* Account info */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-normal mb-6">Informasi Akun</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ border: '1px solid #eaeaea' }}>
                {[
                  { label: 'Nama', value: session.user.name },
                  { label: 'Email', value: session.user.email },
                  { label: 'Member Sejak', value: new Date(session.user.createdAt || Date.now()).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) },
                  { label: 'Status', value: 'Aktif' },
                ].map(({ label, value }) => (
                  <div key={label} className="px-5 py-4" style={{ borderBottom: '1px solid #eaeaea' }}>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-[#707072] mb-1">{label}</p>
                    <p className="text-[13px]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Orders */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Package size={18} className="text-[#707072]" />
                <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-normal">Pesanan Terbaru</h2>
              </div>
              {orders.length === 0 ? (
                <div className="p-10 text-center" style={{ backgroundColor: '#f3efe9' }}>
                  <p className="text-sm text-[#555] mb-5">Anda belum memiliki pesanan.</p>
                  <Link href="/products" className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-[12px] font-medium uppercase tracking-widest px-6 py-3 hover:opacity-80 transition">
                    Mulai Belanja
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order: any) => (
                    <div key={order.id} className="flex justify-between items-center p-4 hover:bg-[#f3efe9] transition" style={{ border: '1px solid #eaeaea' }}>
                      <div>
                        <p className="text-[13px] font-medium">Order #{order.id}</p>
                        <p className="text-[11px] text-[#707072]">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[13px] font-medium">Rp {order.total?.toLocaleString('id-ID')}</p>
                        <p className="text-[11px] text-[#707072]">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Saved */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Heart size={18} className="text-[#707072]" />
                <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-normal">Item Tersimpan</h2>
              </div>
              <div className="p-10 text-center" style={{ backgroundColor: '#f3efe9' }}>
                <p className="text-sm text-[#555] mb-5">Belum ada item yang disimpan.</p>
                <Link href="/products" className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-[12px] font-medium uppercase tracking-widest px-6 py-3 hover:opacity-80 transition">
                  Jelajahi Produk
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #E8E8E8', backgroundColor: '#faf9f8' }}>
        <div className="flex justify-between items-center px-6 md:px-8 py-5">
          <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-base font-semibold tracking-[3px] uppercase">VOGUEIR</span>
          <span className="text-[11px] text-[#9E9EA0] tracking-wider">© 2024 Vogueir Fashion</span>
        </div>
      </footer>
    </div>
  )
}
