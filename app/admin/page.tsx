'use client'

import { Navbar } from '@/components/navbar'
import { useState } from 'react'
import { Plus, Edit2, Trash2, TrendingUp, Package, Users, DollarSign } from 'lucide-react'

const ADMIN_PRODUCTS = [
  { id: '1', name: 'Structured Oversized Jacket', category: "Women's", price: 890000, stock: 15 },
  { id: '2', name: 'Wide Leg Cargo Pant', category: "Women's", price: 650000, stock: 25 },
  { id: '3', name: 'Essential Pullover Hoodie', category: "Men's", price: 420000, stock: 30 },
  { id: '4', name: 'Canvas Studio Tote', category: 'Accessories', price: 480000, stock: 18 },
  { id: '5', name: 'Urban Runner Mono', category: 'Accessories', price: 1200000, stock: 10 },
]

const STATS = [
  { label: 'Total Pesanan', value: '1.234', icon: Package, color: '#3b82f6' },
  { label: 'Pendapatan', value: 'Rp 45,6 Jt', icon: DollarSign, color: '#22c55e' },
  { label: 'Produk', value: '128', icon: TrendingUp, color: '#f59e0b' },
  { label: 'Pelanggan', value: '892', icon: Users, color: '#8b5cf6' },
]

export default function AdminDashboardPage() {
  const [products, setProducts] = useState(ADMIN_PRODUCTS)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '' })

  const deleteProduct = (id: string) => setProducts(products.filter(p => p.id !== id))

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const id = String(products.length + 1)
    setProducts([...products, { id, name: newProduct.name, category: newProduct.category, price: Number(newProduct.price), stock: Number(newProduct.stock) }])
    setNewProduct({ name: '', category: '', price: '', stock: '' })
    setShowAddForm(false)
  }

  const inputClass = "w-full px-3 py-2.5 text-sm focus:outline-none bg-white"
  const inputStyle = { border: '1px solid #D8D8D8' }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf9f8', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* Header */}
      <section className="px-6 md:px-8 py-10 md:py-14" style={{ borderBottom: '1px solid #eaeaea' }}>
        <p className="text-[0.75rem] font-medium uppercase tracking-[2px] mb-3 text-[#555]">Panel Admin</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-normal">Dashboard</h1>
      </section>

      {/* Main */}
      <section className="flex-1 px-6 md:px-8 py-10 space-y-10">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="p-5" style={{ border: '1px solid #eaeaea', backgroundColor: '#fff' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-medium uppercase tracking-widest text-[#707072]">{s.label}</p>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-normal">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Products */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-normal">Manajemen Produk</h2>
            <button onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 bg-[#1a1a1a] text-white text-[11px] font-medium uppercase tracking-wider px-4 py-2.5 hover:opacity-80 transition">
              <Plus size={14} /> Tambah Produk
            </button>
          </div>

          {/* Add form */}
          {showAddForm && (
            <form onSubmit={addProduct} className="p-5 mb-5 space-y-3" style={{ backgroundColor: '#f3efe9', border: '1px solid #D8D8D8' }}>
              <h3 className="text-[12px] font-semibold uppercase tracking-widest mb-4">Produk Baru</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-widest mb-1.5">Nama Produk</label>
                  <input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-widest mb-1.5">Kategori</label>
                  <input value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} required className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-widest mb-1.5">Harga (Rp)</label>
                  <input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-widest mb-1.5">Stok</label>
                  <input type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} required className={inputClass} style={inputStyle} />
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" className="bg-[#1a1a1a] text-white text-[11px] font-medium uppercase tracking-wider px-5 py-2.5 hover:opacity-80 transition">
                  Simpan
                </button>
                <button type="button" onClick={() => setShowAddForm(false)}
                  className="text-[11px] font-medium uppercase tracking-wider px-5 py-2.5 hover:bg-white transition"
                  style={{ border: '1px solid #D8D8D8', color: '#1a1a1a' }}>
                  Batal
                </button>
              </div>
            </form>
          )}

          {/* Table */}
          <div style={{ border: '1px solid #eaeaea', backgroundColor: '#fff' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ borderBottom: '1px solid #eaeaea', backgroundColor: '#f3efe9' }}>
                  <tr>
                    {['Produk', 'Kategori', 'Harga', 'Stok', 'Aksi'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[#707072]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, idx) => (
                    <tr key={p.id} style={{ borderBottom: idx < products.length - 1 ? '1px solid #eaeaea' : 'none' }}
                      className="hover:bg-[#faf9f8] transition">
                      <td className="px-5 py-4 text-[13px] font-medium">{p.name}</td>
                      <td className="px-5 py-4 text-[12px] text-[#707072]">{p.category}</td>
                      <td className="px-5 py-4 text-[13px] font-medium">Rp {p.price.toLocaleString('id-ID')}</td>
                      <td className="px-5 py-4 text-[13px]">
                        <span className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider"
                          style={{ backgroundColor: p.stock > 15 ? '#f0fdf4' : '#fff7ed', color: p.stock > 15 ? '#166534' : '#9a3412' }}>
                          {p.stock} unit
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-1">
                          <button className="p-2 text-[#707072] hover:text-[#1a1a1a] transition"><Edit2 size={14} /></button>
                          <button onClick={() => deleteProduct(p.id)} className="p-2 text-[#707072] hover:text-[#D30005] transition"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-normal mb-5">Pesanan Terbaru</h2>
          <div className="p-10 text-center" style={{ border: '1px solid #eaeaea', backgroundColor: '#fff' }}>
            <p className="text-sm text-[#555] mb-4">Pesanan akan muncul di sini saat ada transaksi.</p>
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #E8E8E8', backgroundColor: '#faf9f8' }}>
        <div className="flex justify-between items-center px-6 md:px-8 py-5">
          <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-base font-semibold tracking-[3px] uppercase">VOGUEIR</span>
          <span className="text-[11px] text-[#9E9EA0] tracking-wider">Admin Panel · © 2024</span>
        </div>
      </footer>
    </div>
  )
}
