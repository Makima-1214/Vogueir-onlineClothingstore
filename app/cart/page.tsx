'use client'

import { Navbar } from '@/components/navbar'
import { PageFooter } from '@/components/page-footer'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trash2, ArrowRight } from 'lucide-react'
import { useCart, type CartItem } from '../../hooks/use-cart'

export default function CartPage() {
  const cart = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const subtotal = cart.items.reduce((s: number, i: CartItem) => s + i.price * i.quantity, 0)
  const shipping = subtotal > 500000 ? 0 : 25000
  const total = subtotal + shipping

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf9f8', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* Header */}
      <section className="px-6 md:px-8 py-10 md:py-14" style={{ borderBottom: '1px solid #eaeaea' }}>
        <p className="text-[0.75rem] font-medium uppercase tracking-[2px] mb-3 text-[#555]">Belanja</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-normal">
          Keranjang Belanja
        </h1>
      </section>

      {/* Main */}
      <section className="flex-1 px-6 md:px-8 py-10">
        {cart.items.length === 0 ? (
          <div className="text-center py-24">
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-normal mb-4">
              Keranjang masih kosong
            </h2>
            <p className="text-sm text-[#555] mb-8">Tambahkan produk dari koleksi kami.</p>
            <Link href="/products"
              className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-[12px] font-medium uppercase tracking-widest px-7 py-4 hover:opacity-80 transition">
              Mulai Belanja <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item: CartItem) => (
                <div key={item.id} className="flex gap-4 p-4" style={{ border: '1px solid #eaeaea' }}>
                  <div className="w-24 h-32 bg-[#f0f0f0] flex-shrink-0 overflow-hidden">
                    {item.img && <img src={item.img} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[14px] mb-1">{item.name}</h3>
                    <p className="text-[11px] text-[#707072] mb-3 uppercase tracking-wider">{item.color} / {item.size}</p>
                    <p className="text-[13px] font-medium mb-4">Rp {item.price.toLocaleString('id-ID')}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center" style={{ border: '1px solid #D8D8D8' }}>
                        <button onClick={() => cart.updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-sm hover:bg-[#f3efe9] transition">−</button>
                        <span className="px-4 py-1.5 text-sm min-w-[2.5rem] text-center">{item.quantity}</span>
                        <button onClick={() => cart.updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-sm hover:bg-[#f3efe9] transition">+</button>
                      </div>
                      <button onClick={() => cart.removeItem(item.id)} className="p-2 text-[#707072] hover:text-[#D30005] transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="p-6" style={{ border: '1px solid #eaeaea', backgroundColor: '#f3efe9' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-normal mb-6">Ringkasan Pesanan</h3>
                <div className="space-y-3 pb-5 mb-5" style={{ borderBottom: '1px solid #D8D8D8' }}>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#707072]">Subtotal</span>
                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#707072]">Ongkir</span>
                    <span>{shipping === 0 ? 'GRATIS' : `Rp ${shipping.toLocaleString('id-ID')}`}</span>
                  </div>
                </div>
                <div className="flex justify-between font-medium mb-6">
                  <span>Total</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
                <Link href="/checkout"
                  className="w-full block text-center bg-[#1a1a1a] text-white text-[12px] font-medium uppercase tracking-widest py-3.5 hover:opacity-80 transition mb-2.5">
                  Lanjut ke Checkout
                </Link>
                <Link href="/products"
                  className="w-full block text-center text-[12px] font-medium uppercase tracking-widest py-3.5 hover:bg-white transition"
                  style={{ border: '1px solid #D8D8D8', color: '#1a1a1a' }}>
                  Lanjut Belanja
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      <PageFooter />
    </div>
  )
}
