'use client'

import { Navbar } from '@/components/navbar'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', province: '', zip: '',
    cardName: '', cardNumber: '', expiry: '', cvc: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setOrderPlaced(true)
    setTimeout(() => router.push('/'), 3000)
  }

  const inputClass = "w-full px-4 py-3 text-sm focus:outline-none bg-white"
  const inputStyle = { border: '1px solid #D8D8D8', color: '#1a1a1a' }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf9f8' }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <Check size={36} className="text-green-600" />
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl font-normal mb-3">Pesanan Dikonfirmasi</h1>
            <p className="text-sm text-[#555] mb-8 max-w-sm mx-auto">
              Terima kasih atas pesanan Anda. Konfirmasi dikirim ke {formData.email || 'email Anda'}.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-[12px] font-medium uppercase tracking-widest px-7 py-4 hover:opacity-80 transition">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf9f8', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* Header */}
      <section className="px-6 md:px-8 py-10 md:py-14" style={{ borderBottom: '1px solid #eaeaea' }}>
        <p className="text-[0.75rem] font-medium uppercase tracking-[2px] mb-3 text-[#555]">Pembelian</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-normal">Checkout</h1>
      </section>

      {/* Steps */}
      <section className="flex-1 px-6 md:px-8 py-10">
        {/* Step indicator */}
        <div className="flex gap-0 mb-10 max-w-md">
          {['Pengiriman', 'Pembayaran', 'Review'].map((label, i) => {
            const num = i + 1
            const active = step >= num
            return (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium transition"
                    style={{ backgroundColor: active ? '#1a1a1a' : '#f0f0f0', color: active ? '#fff' : '#9E9EA0' }}>
                    {step > num ? <Check size={14} /> : num}
                  </div>
                  <p className="text-[10px] uppercase tracking-wider mt-1.5" style={{ color: active ? '#1a1a1a' : '#9E9EA0' }}>{label}</p>
                </div>
                {i < 2 && <div className="flex-1 h-px mx-2 mb-4" style={{ backgroundColor: step > num ? '#1a1a1a' : '#D8D8D8' }} />}
              </div>
            )
          })}
        </div>

        <div className="max-w-lg">
          <form onSubmit={handlePlaceOrder}>

            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-normal mb-6">Alamat Pengiriman</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-widest mb-2">Nama Depan</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-widest mb-2">Nama Belakang</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className={inputClass} style={inputStyle} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-widest mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-widest mb-2">No. Telepon</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-widest mb-2">Alamat</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} required className={inputClass} style={inputStyle} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-widest mb-2">Kota</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-widest mb-2">Provinsi</label>
                    <input type="text" name="province" value={formData.province} onChange={handleChange} required className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-widest mb-2">Kode Pos</label>
                    <input type="text" name="zip" value={formData.zip} onChange={handleChange} required className={inputClass} style={inputStyle} />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)}
                  className="w-full bg-[#1a1a1a] text-white text-[12px] font-medium uppercase tracking-widest py-4 hover:opacity-80 transition mt-4">
                  Lanjut ke Pembayaran
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-normal mb-6">Metode Pembayaran</h2>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-widest mb-2">Nama Pemegang Kartu</label>
                  <input type="text" name="cardName" value={formData.cardName} onChange={handleChange} required className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-widest mb-2">Nomor Kartu</label>
                  <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" maxLength={19} required className={inputClass} style={inputStyle} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-widest mb-2">Berlaku Hingga</label>
                    <input type="text" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM/YY" maxLength={5} required className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-widest mb-2">CVC</label>
                    <input type="text" name="cvc" value={formData.cvc} onChange={handleChange} placeholder="123" maxLength={3} required className={inputClass} style={inputStyle} />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setStep(1)}
                    className="flex-1 text-[12px] font-medium uppercase tracking-widest py-4 hover:bg-[#f3efe9] transition"
                    style={{ border: '1px solid #D8D8D8', color: '#1a1a1a' }}>
                    Kembali
                  </button>
                  <button type="button" onClick={() => setStep(3)}
                    className="flex-1 bg-[#1a1a1a] text-white text-[12px] font-medium uppercase tracking-widest py-4 hover:opacity-80 transition">
                    Review Pesanan
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-normal mb-6">Review Pesanan</h2>
                <div className="p-6 space-y-3" style={{ backgroundColor: '#f3efe9', border: '1px solid #D8D8D8' }}>
                  <h3 className="text-[12px] font-semibold uppercase tracking-widest mb-4">Ringkasan</h3>
                  {[{ label: 'Subtotal', val: 'Rp 0' }, { label: 'Ongkir', val: 'GRATIS' }, { label: 'Total', val: 'Rp 0' }].map(({ label, val }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-[#707072]">{label}</span>
                      <span className="font-medium">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 text-sm" style={{ border: '1px solid #eaeaea' }}>
                  <p className="font-medium mb-1">Pengiriman ke:</p>
                  <p className="text-[#555]">{formData.firstName} {formData.lastName}</p>
                  <p className="text-[#555]">{formData.address}, {formData.city}</p>
                </div>
                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setStep(2)}
                    className="flex-1 text-[12px] font-medium uppercase tracking-widest py-4 hover:bg-[#f3efe9] transition"
                    style={{ border: '1px solid #D8D8D8', color: '#1a1a1a' }}>
                    Kembali
                  </button>
                  <button type="submit"
                    className="flex-1 bg-[#1a1a1a] text-white text-[12px] font-medium uppercase tracking-widest py-4 hover:opacity-80 transition">
                    Buat Pesanan
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      <footer className="px-6 md:px-8 py-6 mt-auto" style={{ borderTop: '1px solid #E8E8E8', backgroundColor: '#faf9f8' }}>
        <p className="text-[11px] text-[#9E9EA0] text-center tracking-wider">© 2024 Vogueir Fashion. Privacy · Terms</p>
      </footer>
    </div>
  )
}
