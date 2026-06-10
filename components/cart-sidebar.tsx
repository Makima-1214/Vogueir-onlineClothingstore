'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, X, Trash2 } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'

// Event bus sederhana untuk toggle cart dari mana saja
export const cartEvents = {
  open: () => window.dispatchEvent(new CustomEvent('cart:open')),
  close: () => window.dispatchEvent(new CustomEvent('cart:close')),
  toggle: () => window.dispatchEvent(new CustomEvent('cart:toggle')),
}

export function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const cart = useCart()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onOpen = () => setIsOpen(true)
    const onClose = () => setIsOpen(false)
    const onToggle = () => setIsOpen((v) => !v)
    window.addEventListener('cart:open', onOpen)
    window.addEventListener('cart:close', onClose)
    window.addEventListener('cart:toggle', onToggle)
    return () => {
      window.removeEventListener('cart:open', onOpen)
      window.removeEventListener('cart:close', onClose)
      window.removeEventListener('cart:toggle', onToggle)
    }
  }, [])

  const subtotal = cart.items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
          />
          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white shadow-2xl flex flex-col"
            style={{ zIndex: 9999 }}
          >
            <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-[14px] font-semibold uppercase tracking-widest">Keranjang Belanja</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 hover:bg-gray-50 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {!mounted || cart.items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={24} className="text-[#9E9EA0]" />
                  </div>
                  <p className="text-[13px] text-[#555] mb-6">Keranjang kamu masih kosong.</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[11px] font-semibold uppercase tracking-widest border-b border-[#1a1a1a] pb-1 hover:opacity-60 transition"
                  >
                    Mulai Belanja
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-24 bg-gray-50 overflow-hidden flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-[13px] font-medium leading-tight max-w-[160px]">{item.name}</h3>
                          <button
                            onClick={() => cart.removeItem(item.id)}
                            className="text-[#9E9EA0] hover:text-[#D30005] transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] text-[#9E9EA0] uppercase tracking-wider mb-2">
                          {item.color} / {item.size}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border border-gray-200">
                            <button
                              onClick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-xs hover:bg-gray-50 transition"
                            >
                              −
                            </button>
                            <span className="px-3 py-1 text-[11px] min-w-[30px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-xs hover:bg-gray-50 transition"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-[12px] font-semibold">
                            Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {mounted && cart.items.length > 0 && (
              <div className="px-6 py-6 md:py-8 bg-gray-50 border-t border-gray-100" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[11px] font-medium uppercase tracking-widest text-[#707072]">Subtotal</span>
                  <span className="text-[15px] font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="space-y-2">
                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="w-full h-12 bg-[#1a1a1a] text-white text-[11px] font-semibold uppercase tracking-[2px] flex items-center justify-center gap-2 hover:opacity-90 transition"
                  >
                    Checkout Sekarang
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="w-full h-12 border border-gray-200 text-[#1a1a1a] text-[11px] font-semibold uppercase tracking-[2px] flex items-center justify-center hover:bg-white transition"
                  >
                    Lihat Keranjang Penuh
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Badge count untuk dipakai di Navbar
export function CartBadge() {
  const [mounted, setMounted] = useState(false)
  const cart = useCart()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      onClick={cartEvents.open}
      className="p-2 text-[#1a1a1a] hover:opacity-60 transition relative"
      aria-label="Buka keranjang"
    >
      <ShoppingBag size={20} strokeWidth={1.5} />
      <span className="absolute top-1 right-1 bg-[#1a1a1a] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
        {mounted ? cart.items.length : 0}
      </span>
    </button>
  )
}
