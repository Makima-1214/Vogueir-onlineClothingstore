'use client'

import { Navbar } from '@/components/navbar'
import { PageFooter } from '@/components/page-footer'
import { useSession, signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/use-cart'
import { PRODUCTS, ALL_PRODUCTS_LIST, type Product } from '@/lib/products'
import {
  User,
  Package,
  Heart,
  LogOut,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  Eye,
  Check,
  Plus,
  Trash2,
  X,
  ArrowRight,
  ChevronRight,
  Camera,
  Loader2,
  Info,
  Smartphone,
  Star,
  Settings
} from 'lucide-react'

// ─── INITIAL LOCAL STORAGE DATA (FALLBACKS) ──────────────────────────────────
const DEFAULT_ADDRESSES = [
  {
    id: 'addr-1',
    label: 'Utama (Home)',
    receiver: 'Alexander Vogue',
    phone: '+62 812-3456-7890',
    address: 'Jl. Senopati No. 45, Kebayoran Baru',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    zip: '12190',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Kantor (Office)',
    receiver: 'Alexander Vogue',
    phone: '+62 812-9876-5432',
    address: 'Pacific Place Mall, Lantai 15, Jl. Jend. Sudirman Kav. 52-53',
    city: 'Jakarta Pusat',
    province: 'DKI Jakarta',
    zip: '12190',
    isDefault: false,
  }
]

const DEFAULT_CARDS = [
  {
    id: 'card-1',
    type: 'visa',
    number: '•••• •••• •••• 4321',
    holder: 'ALEXANDER VOGUE',
    expiry: '12/28',
    color: 'from-zinc-900 via-neutral-900 to-stone-800',
    text: 'text-zinc-100',
    brandColor: 'text-[#D4AF37]' // Gold Accent
  },
  {
    id: 'card-2',
    type: 'mastercard',
    number: '•••• •••• •••• 8765',
    holder: 'ALEXANDER VOGUE',
    expiry: '08/29',
    color: 'from-[#1a1c24] to-[#2a3042]',
    text: 'text-gray-100',
    brandColor: 'text-orange-500'
  }
]

// Mock profile images if user wants to change avatar
const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face'
]

// Mock data for static-ish lists
const MOCK_ORDERS = [
  {
    id: 'VG-9082',
    date: '8 Juni 2026',
    status: 'Delivered', // Delivered, Processing, Shipped, Cancelled
    total: 1740000,
    items: [
      { id: '5', name: 'Relaxed Linen Shirt', color: 'Ecru', size: 'L', quantity: 1, price: 540000, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&auto=format&fit=crop' },
      { id: '6', name: 'Urban Runner Mono', color: 'Black', size: '42', quantity: 1, price: 1200000, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&auto=format&fit=crop' }
    ],
    address: 'Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190',
    deliveryMethod: 'Express Shipping (1-2 Days)',
    paymentMethod: 'Visa (•••• 4321)'
  },
  {
    id: 'VG-8731',
    date: '22 May 2026',
    status: 'Shipped',
    total: 890000,
    items: [
      { id: '1', name: 'Structured Oversized Jacket', color: 'Black', size: 'M', quantity: 1, price: 890000, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&auto=format&fit=crop' }
    ],
    address: 'Pacific Place Mall, Lantai 15, Jl. Jend. Sudirman Kav. 52-53, Jakarta Pusat, DKI Jakarta 12190',
    deliveryMethod: 'Standard Shipping (3-4 Days)',
    paymentMethod: 'Mastercard (•••• 8765)'
  },
  {
    id: 'VG-8109',
    date: '12 April 2026',
    status: 'Processing',
    total: 650000,
    items: [
      { id: '2', name: 'Wide Leg Cargo Pant', color: 'Sand', size: 'M', quantity: 1, price: 650000, img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&auto=format&fit=crop' }
    ],
    address: 'Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190',
    deliveryMethod: 'Standard Shipping (3-4 Days)',
    paymentMethod: 'Bank Transfer (BCA)'
  },
  {
    id: 'VG-7542',
    date: '3 Maret 2026',
    status: 'Cancelled',
    total: 420000,
    items: [
      { id: '3', name: 'Essential Pullover Hoodie', color: 'Black', size: 'S', quantity: 1, price: 420000, img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=500&auto=format&fit=crop' }
    ],
    address: 'Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190',
    deliveryMethod: 'Standard Shipping (3-4 Days)',
    paymentMethod: 'OVO / E-Wallet'
  }
]

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, isPending: sessionPending, reload: reloadSession } = useSession()
  const cart = useCart()

  // ─── TABS & STATE ──────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'wishlist' | 'addresses' | 'payments' | 'settings'>('dashboard')
  const [addresses, setAddresses] = useState<any[]>([])
  const [cards, setCards] = useState<any[]>([])
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])

  // Modal controls
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [avatarPresetSelector, setAvatarPresetSelector] = useState(false)

  // Quick View Product Detail State
  const [qvSize, setQvSize] = useState('')
  const [qvVariantIdx, setQvVariantIdx] = useState(0)
  const [qvQty, setQvQty] = useState(1)

  // Loading & Feedback Toast
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [updatingProfile, setUpdatingProfile] = useState(false)

  // Settings Forms state
  const [profileForm, setProfileForm] = useState({ name: '', image: '', phone: '+62 812-3456-7890', birthdate: '1996-05-15', gender: 'male' })
  const [securityForm, setSecurityForm] = useState({ password: '', newPassword: '', confirmPassword: '' })
  const [newAddressForm, setNewAddressForm] = useState({ label: '', receiver: '', phone: '', address: '', city: '', province: '', zip: '' })
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [newCardForm, setNewCardForm] = useState({ number: '', holder: '', expiry: '', cvc: '', type: 'visa' })
  const [showCardForm, setShowCardForm] = useState(false)

  // Preferences Toggles
  const [prefNotification, setPrefNotification] = useState({ email: true, sms: false, push: true, promo: true })
  const [prefPrivacy, setPrefPrivacy] = useState({ cookies: true, publicProfile: false })
  const [prefDensity, setPrefDensity] = useState<'editorial' | 'cozy'>('editorial')

  // Redirection when unauthorized
  useEffect(() => {
    if (!sessionPending && !session?.user) {
      router.push('/sign-in')
    }
  }, [session, sessionPending, router])

  // Sync session name with settings form once loaded
  useEffect(() => {
    if (session?.user) {
      setProfileForm(prev => ({
        ...prev,
        name: session.user.name || '',
        image: session.user.image || '',
      }))
    }
  }, [session])

  // Load / initialize localStorage items
  useEffect(() => {
    // Addresses
    const savedAddr = localStorage.getItem('vogueir-addresses')
    if (savedAddr) {
      setAddresses(JSON.parse(savedAddr))
    } else {
      localStorage.setItem('vogueir-addresses', JSON.stringify(DEFAULT_ADDRESSES))
      setAddresses(DEFAULT_ADDRESSES)
    }

    // Payment Cards
    const savedCards = localStorage.getItem('vogueir-cards')
    if (savedCards) {
      setCards(JSON.parse(savedCards))
    } else {
      localStorage.setItem('vogueir-cards', JSON.stringify(DEFAULT_CARDS))
      setCards(DEFAULT_CARDS)
    }

    // Wishlist items fallback (Products 1, 4, 6)
    const savedWish = localStorage.getItem('vogueir-wishlist-items')
    if (savedWish) {
      setWishlistItems(JSON.parse(savedWish))
    } else {
      const items = [PRODUCTS['1'], PRODUCTS['4'], PRODUCTS['6']].filter(Boolean) as Product[]
      localStorage.setItem('vogueir-wishlist-items', JSON.stringify(items))
      setWishlistItems(items)
    }
  }, [])

  // Helper to trigger Toast
  const triggerToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type })
    setTimeout(() => setToastMessage(null), 3000)
  }

  // ─── ACTION HANDLERS ────────────────────────────────────────────────────────

  // Update Profile (Calls backend API)
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdatingProfile(true)
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileForm.name,
          image: profileForm.image
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal memperbarui profil.')

      triggerToast('Profil berhasil diperbarui.')
      setIsEditProfileOpen(false)
      reloadSession()
    } catch (err: any) {
      triggerToast(err.message || 'Terjadi kesalahan.', 'error')
    } finally {
      setUpdatingProfile(false)
    }
  }

  // Change Password
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      triggerToast('Konfirmasi password tidak cocok.', 'error')
      return
    }

    setUpdatingProfile(true)
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: securityForm.password,
          newPassword: securityForm.newPassword
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal memperbarui password.')

      triggerToast('Password berhasil diubah.')
      setSecurityForm({ password: '', newPassword: '', confirmPassword: '' })
    } catch (err: any) {
      triggerToast(err.message || 'Terjadi kesalahan.', 'error')
    } finally {
      setUpdatingProfile(false)
    }
  }

  // Add new address
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault()
    const newAddr = {
      id: `addr-${Date.now()}`,
      ...newAddressForm,
      isDefault: addresses.length === 0
    }
    const updated = [...addresses, newAddr]
    setAddresses(updated)
    localStorage.setItem('vogueir-addresses', JSON.stringify(updated))
    setNewAddressForm({ label: '', receiver: '', phone: '', address: '', city: '', province: '', zip: '' })
    setShowAddressForm(false)
    triggerToast('Alamat berhasil ditambahkan.')
  }

  // Delete address
  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter(a => a.id !== id)
    setAddresses(updated)
    localStorage.setItem('vogueir-addresses', JSON.stringify(updated))
    triggerToast('Alamat berhasil dihapus.')
  }

  // Add new payment card
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()
    // Formatting card number (last 4 digits shown)
    const cleanNumber = newCardForm.number.replace(/\s+/g, '')
    const lastDigits = cleanNumber.slice(-4) || '1111'
    
    // Choose styling color gradient
    const colorOptions = [
      'from-zinc-900 via-neutral-900 to-stone-800',
      'from-[#323b42] to-[#121318]',
      'from-[#2a3042] to-[#0d0f14]'
    ]
    const chosenColor = colorOptions[cards.length % colorOptions.length]

    const newCard = {
      id: `card-${Date.now()}`,
      type: newCardForm.type,
      number: `•••• •••• •••• ${lastDigits}`,
      holder: newCardForm.holder.toUpperCase(),
      expiry: newCardForm.expiry,
      color: chosenColor,
      text: 'text-zinc-100',
      brandColor: newCardForm.type === 'visa' ? 'text-[#D4AF37]' : 'text-orange-500'
    }

    const updated = [...cards, newCard]
    setCards(updated)
    localStorage.setItem('vogueir-cards', JSON.stringify(updated))
    setNewCardForm({ number: '', holder: '', expiry: '', cvc: '', type: 'visa' })
    setShowCardForm(false)
    triggerToast('Metode pembayaran berhasil disimpan.')
  }

  // Delete payment card
  const handleDeleteCard = (id: string) => {
    const updated = cards.filter(c => c.id !== id)
    setCards(updated)
    localStorage.setItem('vogueir-cards', JSON.stringify(updated))
    triggerToast('Kartu pembayaran dihapus.')
  }

  // Remove from Wishlist
  const handleRemoveFromWishlist = (id: string) => {
    const updated = wishlistItems.filter(item => item.id !== id)
    setWishlistItems(updated)
    localStorage.setItem('vogueir-wishlist-items', JSON.stringify(updated))
    triggerToast('Item dihapus dari wishlist.')
  }

  // Open Quick View Modal
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product)
    setQvSize(product.sizes[0] || 'M')
    setQvVariantIdx(0)
    setQvQty(1)
  }

  // Add Item from Quick View to Cart
  const handleQuickAdd = () => {
    if (!quickViewProduct) return
    const activeVariant = quickViewProduct.variants[qvVariantIdx]
    cart.addItem({
      id: `${quickViewProduct.id}-${qvSize}-${activeVariant.color}`,
      name: quickViewProduct.name,
      price: quickViewProduct.price,
      quantity: qvQty,
      size: qvSize,
      color: activeVariant.color,
      img: activeVariant.imgs[0]
    })
    setQuickViewProduct(null)
    triggerToast('Produk ditambahkan ke keranjang belanja.')
  }

  // Logout handler
  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
  }

  // ─── RENDERING HELPER CONTROLS ──────────────────────────────────────────────
  if (sessionPending) {
    return (
      <div className="min-h-screen flex flex-col bg-[#faf9f8]" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center space-y-3">
          <Loader2 size={30} className="animate-spin text-[#1a1a1a]" />
          <p className="text-[#707072] text-xs uppercase tracking-widest font-medium">Menghubungkan Akun Vogueir...</p>
        </div>
      </div>
    )
  }

  if (!session?.user) return null

  const navItems = [
    { label: 'Overview', icon: <User size={16} strokeWidth={1.5} />, value: 'dashboard' },
    { label: 'Pesanan Saya', icon: <Package size={16} strokeWidth={1.5} />, value: 'orders' },
    { label: 'Item Tersimpan', icon: <Heart size={16} strokeWidth={1.5} />, value: 'wishlist' },
    { label: 'Buku Alamat', icon: <MapPin size={16} strokeWidth={1.5} />, value: 'addresses' },
    { label: 'Metode Pembayaran', icon: <CreditCard size={16} strokeWidth={1.5} />, value: 'payments' },
    { label: 'Pengaturan Akun', icon: <Settings size={16} strokeWidth={1.5} />, value: 'settings' },
  ]

  // Status mapping for visual luxury look
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered':
        return { bg: 'bg-green-50 border-green-200 text-green-700', label: 'Terkirim' }
      case 'Shipped':
        return { bg: 'bg-blue-50 border-blue-200 text-blue-700', label: 'Dalam Pengiriman' }
      case 'Processing':
        return { bg: 'bg-amber-50 border-amber-200 text-amber-700', label: 'Diproses' }
      case 'Cancelled':
        return { bg: 'bg-red-50 border-red-200 text-red-700', label: 'Dibatalkan' }
      default:
        return { bg: 'bg-gray-50 border-gray-200 text-gray-700', label: status }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f8] text-[#1a1a1a]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── TOAST NOTIFICATION ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 z-[100] flex items-center gap-3 px-5 py-4 shadow-xl border border-neutral-800"
            style={{
              backgroundColor: toastMessage.type === 'success' ? '#1a1a1a' : '#D30005',
              color: '#fff',
              minWidth: '300px'
            }}
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 flex-shrink-0">
              <Check size={12} strokeWidth={3} />
            </span>
            <span className="text-[12px] font-medium tracking-wide uppercase">{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MAIN LAYOUT CONTAINER ────────────────────────────────────────────── */}
      {/* Mobile: bottom safe padding for sticky tab bar */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-0 md:px-10 py-0 md:py-12 flex flex-col md:flex-row gap-0 md:gap-10 pb-20 md:pb-0">

        {/* ─── SIDEBAR (Desktop Only) ─────────────────────────────────────────── */}
        <aside className="hidden md:flex w-64 flex-shrink-0 flex-col md:sticky md:top-28 md:self-start">
          {/* User Fast Badge */}
          <div className="flex items-center gap-4 p-5 mb-6 border border-[#eaeaea]" style={{ backgroundColor: '#f3efe9' }}>
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-lg font-normal overflow-hidden border border-[#eaeaea]">
                {session.user.image ? (
                  <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  (session.user.name ?? session.user.email).charAt(0).toUpperCase()
                )}
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="text-[12px] uppercase tracking-wider font-semibold truncate leading-tight text-[#1a1a1a]">{session.user.name ?? 'Vogueir Member'}</p>
              <p className="text-[11px] text-[#707072] truncate">{session.user.email}</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = activeTab === item.value
              return (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value as any)}
                  className={`flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-widest font-semibold transition text-left focus:outline-none ${
                    active
                      ? 'bg-[#1a1a1a] text-white'
                      : 'text-[#555] hover:bg-[#f3efe9] hover:text-[#1a1a1a]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              )
            })}
            <div className="my-3 border-t border-[#eaeaea]" />
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-widest font-semibold transition text-[#D30005] hover:bg-red-50/50 text-left focus:outline-none"
            >
              <LogOut size={16} strokeWidth={1.5} />
              <span>Keluar</span>
            </button>
          </nav>
        </aside>

        {/* ─── MOBILE STICKY BOTTOM TAB BAR ───────────────────────────────────── */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#eaeaea] flex items-stretch" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {navItems.slice(0, 5).map((item) => {
            const active = activeTab === item.value
            return (
              <button
                key={item.value}
                onClick={() => setActiveTab(item.value as any)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[9px] uppercase tracking-wider font-bold transition focus:outline-none ${
                  active ? 'text-[#1a1a1a]' : 'text-[#aaa]'
                }`}
              >
                <span className={`transition-transform duration-200 ${active ? 'scale-110' : ''}`}>{item.icon}</span>
                <span className="leading-tight">{item.label.split(' ')[0]}</span>
                {active && <span className="absolute bottom-0 h-0.5 w-8 bg-[#1a1a1a] rounded-full" />}
              </button>
            )
          })}
          <button
            onClick={handleSignOut}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[9px] uppercase tracking-wider font-bold text-[#D30005] transition focus:outline-none"
          >
            <LogOut size={16} strokeWidth={1.5} />
            <span>Keluar</span>
          </button>
        </nav>

        {/* ─── MAIN CONTENT AREA ──────────────────────────────────────────────── */}
        <section className="flex-1 min-w-0 px-4 sm:px-6 md:px-0 pt-5 md:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-6"
            >

              {/* ────────────────────────────────────────────────────────────────
                  ① DASHBOARD / OVERVIEW
                  ──────────────────────────────────────────────────────────────── */}
              {activeTab === 'dashboard' && (
                <>
                  {/* ── Profile Header Card ── */}
                  <div
                    className="relative overflow-hidden border border-[#eaeaea]"
                    style={{ backgroundColor: '#f3efe9' }}
                  >
                    {/* Background dot grid */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px]" />

                    <div className="relative z-10 flex flex-col items-center text-center p-6 pb-5 md:flex-row md:text-left md:items-center md:gap-5 md:justify-between md:p-8">
                      {/* Avatar + info group */}
                      <div className="flex flex-col items-center md:flex-row md:items-center gap-4">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <div className="w-20 h-20 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-3xl font-normal overflow-hidden border-2 border-white shadow-md">
                            {session.user.image ? (
                              <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              (session.user.name ?? session.user.email).charAt(0).toUpperCase()
                            )}
                          </div>
                          <button
                            onClick={() => setAvatarPresetSelector(true)}
                            className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white border border-[#eaeaea] shadow-md hover:bg-neutral-100 transition"
                            title="Ubah Foto Profil"
                          >
                            <Camera size={12} className="text-[#1a1a1a]" />
                          </button>
                        </div>

                        {/* Name / email / badge */}
                        <div className="space-y-1.5">
                          <h2 className="text-2xl font-normal leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {session.user.name ?? 'Vogueir Member'}
                          </h2>
                          <p className="text-xs text-[#707072]">{session.user.email}</p>
                          <div className="flex items-center justify-center md:justify-start gap-2 pt-0.5">
                            <span className="text-[8px] uppercase tracking-[1.5px] font-bold text-white bg-[#1a1a1a] px-2.5 py-1">
                              PLATINUM COLLECTOR
                            </span>
                          </div>
                          <p className="text-[9px] text-[#888] uppercase tracking-widest font-semibold">
                            Anggota sejak: {new Date(session.user.createdAt || Date.now()).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
                          </p>
                        </div>
                      </div>

                      {/* Edit button */}
                      <button
                        onClick={() => setIsEditProfileOpen(true)}
                        className="mt-4 md:mt-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[#1a1a1a] text-[10px] uppercase tracking-widest font-bold bg-[#1a1a1a] text-white hover:bg-transparent hover:text-[#1a1a1a] transition duration-300 focus:outline-none min-h-[44px] w-full md:w-auto"
                      >
                        Edit Profil
                      </button>
                    </div>
                  </div>

                  {/* Loyalty Progress Card */}
                  <div
                    className="p-5 border relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(243, 239, 233, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)',
                      backdropFilter: 'blur(12px)',
                      borderColor: '#eaeaea'
                    }}
                  >
                    <div className="flex justify-between items-start gap-3 mb-4">
                      <div>
                        <p className="text-[9px] uppercase tracking-[3px] font-bold text-[#888] mb-1">PROGRAM LOYALITAS</p>
                        <h3 className="text-base font-normal uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>Platinum Tier Benefit</h3>
                      </div>
                      <span className="text-[9px] font-semibold text-[#1a1a1a] bg-white border border-[#eaeaea] px-2.5 py-1 flex-shrink-0">
                        Diamond @ Rp 15jt
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#eaeaea] h-1.5 overflow-hidden mb-2">
                      <div className="bg-[#1a1a1a] h-full" style={{ width: '68%' }} />
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-[#707072] mb-3">
                      <span>Rp 10.240.000</span>
                      <span className="font-semibold text-[#1a1a1a]">Rp 4.760.000 lagi</span>
                    </div>

                    <div className="p-3 bg-white/50 border border-white/50 text-[10.5px] text-[#555] flex gap-2.5 items-start">
                      <Info size={13} className="text-[#1a1a1a] mt-0.5 flex-shrink-0" />
                      <p>Sebagai <strong>Platinum Collector</strong>, Anda berhak atas <strong>Gratis Ongkir Express</strong> & akses produk baru 24 jam lebih awal.</p>
                    </div>
                  </div>

                  {/* Account Statistics Grid */}
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[3px] font-bold text-[#888] mb-4">RINGKASAN AKUN</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { label: 'Total Pesanan', value: '12', desc: '4 Terkirim tahun ini', link: 'orders' },
                        { label: 'Item Tersimpan', value: wishlistItems.length.toString(), desc: 'Tersimpan di wishlist', link: 'wishlist' },
                        { label: 'Keranjang', value: cart.items.length.toString(), desc: 'Siap dicheckout', link: 'cart' },
                        { label: 'Ulasan Saya', value: '4', desc: 'Ulasan diberikan', link: 'settings' }
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          onClick={() => {
                            if (stat.link === 'cart') {
                              const btn = document.querySelector('[aria-label="Buka keranjang"]') as HTMLButtonElement
                              btn?.click()
                            } else {
                              setActiveTab(stat.link as any)
                            }
                          }}
                          className="p-4 border border-[#eaeaea] bg-white cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-neutral-400 transition-all duration-300 flex flex-col gap-2"
                        >
                          <p className="text-[9px] uppercase tracking-widest font-bold text-[#707072] leading-tight">{stat.label}</p>
                          <p className="text-3xl font-normal text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.value}</p>
                          <span className="text-[10px] text-[#888] leading-tight block">{stat.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions Section */}
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[3px] font-bold text-[#888] mb-4">AKSES CEPAT</h3>
                    {/* Mobile: list rows; Desktop: 3-col grid */}
                    <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-px sm:gap-3 border border-[#eaeaea] sm:border-0 overflow-hidden">
                      {[
                        { label: 'Edit Profil Saya', val: 'settings', desc: 'Ubah nama, avatar & data diri', icon: <User size={17} strokeWidth={1.5} /> },
                        { label: 'Riwayat Transaksi', val: 'orders', desc: 'Lacak & tinjau seluruh pesanan', icon: <Package size={17} strokeWidth={1.5} /> },
                        { label: 'Wishlist Lengkap', val: 'wishlist', desc: 'Kelola produk impian Anda', icon: <Heart size={17} strokeWidth={1.5} /> },
                        { label: 'Buku Alamat', val: 'addresses', desc: 'Ubah alamat pengiriman & default', icon: <MapPin size={17} strokeWidth={1.5} /> },
                        { label: 'Kartu Pembayaran', val: 'payments', desc: 'Atur kartu kredit & e-wallet', icon: <CreditCard size={17} strokeWidth={1.5} /> },
                        { label: 'Notifikasi & Privasi', val: 'settings', desc: 'Setel pesan masuk & langganan', icon: <Bell size={17} strokeWidth={1.5} /> },
                      ].map((action) => (
                        <button
                          key={action.label}
                          onClick={() => setActiveTab(action.val as any)}
                          className="flex items-center gap-4 text-left py-4 px-4 sm:py-5 bg-white border-b sm:border border-[#eaeaea] hover:bg-[#f3efe9] hover:border-[#1a1a1a] transition duration-200 focus:outline-none min-h-[60px] sm:min-h-[72px] last:border-b-0 sm:last:border-b"
                        >
                          <span className="text-[#888] flex-shrink-0">{action.icon}</span>
                          <div className="flex-1 min-w-0">
                            <span className="block text-[12px] sm:text-[11.5px] uppercase tracking-wider font-bold text-[#1a1a1a] mb-0.5">{action.label}</span>
                            <span className="block text-[10px] text-[#707072] leading-relaxed truncate">{action.desc}</span>
                          </div>
                          <ChevronRight size={16} className="text-[#ccc] flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Orders Overview */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-[10px] uppercase tracking-[3px] font-bold text-[#888]">PESANAN TERBARU</h3>
                      <button onClick={() => setActiveTab('orders')} className="text-[10px] uppercase tracking-widest font-bold border-b border-[#1a1a1a] pb-0.5 hover:text-neutral-500 hover:border-neutral-400 transition">Lihat Semua</button>
                    </div>

                    <div className="space-y-2">
                      {MOCK_ORDERS.slice(0, 2).map((order) => {
                        const statusDetails = getStatusStyle(order.status)
                        return (
                          <div
                            key={order.id}
                            className="flex items-center gap-4 p-4 border border-[#eaeaea] bg-white"
                          >
                            {/* Product Thumbnail */}
                            <div className="flex -space-x-3 flex-shrink-0">
                              {order.items.slice(0, 2).map((item, idx) => (
                                <div key={idx} className="w-11 h-14 bg-[#f0f0f0] border-2 border-white overflow-hidden shadow-sm flex-shrink-0">
                                  <img src={item.img} alt="" className="w-full h-full object-cover" />
                                </div>
                              ))}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-bold truncate">#{order.id}</p>
                              <p className="text-[10px] text-[#707072]">{order.date}</p>
                              <span className={`inline-block text-[8px] uppercase tracking-wider font-bold px-2 py-0.5 border mt-1 ${statusDetails.bg}`}>
                                {statusDetails.label}
                              </span>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-[12px] font-bold">Rp {order.total.toLocaleString('id-ID')}</p>
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="text-[9px] uppercase tracking-widest font-bold text-[#1a1a1a] hover:text-[#707072] transition mt-1 flex items-center gap-0.5 ml-auto"
                              >
                                Detail <ChevronRight size={11} />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Wishlist Preview */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-[10px] uppercase tracking-[3px] font-bold text-[#888]">WISHLIST TERBARU</h3>
                      <button onClick={() => setActiveTab('wishlist')} className="text-[10px] uppercase tracking-widest font-bold border-b border-[#1a1a1a] pb-0.5 hover:text-neutral-500 hover:border-neutral-400 transition">Kelola Wishlist</button>
                    </div>

                    {wishlistItems.length === 0 ? (
                      <div className="p-8 text-center border border-[#eaeaea]" style={{ backgroundColor: '#f3efe9' }}>
                        <p className="text-xs text-[#555] mb-4">Belum ada item yang disimpan.</p>
                        <Link href="/products" className="inline-flex bg-[#1a1a1a] text-white text-[10px] uppercase tracking-widest font-bold px-5 py-3 hover:opacity-80 transition">
                          Cari Produk
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2.5">
                        {wishlistItems.slice(0, 3).map((product) => (
                          <div key={product.id} className="group block relative border border-[#eaeaea] bg-white p-2">
                            <div className="relative bg-[#f0f0f0] aspect-[3/4] mb-2 overflow-hidden">
                              <img
                                src={product.variants[0]?.imgs[0] || ''}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <button
                                onClick={() => openQuickView(product)}
                                className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] text-white text-[9px] font-bold uppercase tracking-wider py-2 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300"
                              >
                                Quick View
                              </button>
                            </div>
                            <h4 className="text-[11px] font-semibold truncate mb-0.5 leading-tight">{product.name}</h4>
                            <p className="text-[11px] font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* ────────────────────────────────────────────────────────────────
                  ② ORDERS LIST
                  ──────────────────────────────────────────────────────────────── */}
              {activeTab === 'orders' && (
                <div className="space-y-5">
                  <div className="border-b border-[#eaeaea] pb-4">
                    <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl sm:text-3xl font-normal mb-1">Riwayat Pesanan</h2>
                    <p className="text-xs text-[#707072]">Tinjau seluruh riwayat pesanan Anda di Vogueir</p>
                  </div>

                  {/* Status quick filter strip (ecommerce pattern) */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Diproses', status: 'Processing', count: 1 },
                      { label: 'Dikirim', status: 'Shipped', count: 1 },
                      { label: 'Terkirim', status: 'Delivered', count: 1 },
                      { label: 'Dibatalkan', status: 'Cancelled', count: 1 },
                    ].map((s) => {
                      const st = getStatusStyle(s.status)
                      return (
                        <div key={s.status} className={`flex flex-col items-center py-3 px-1 border text-center ${st.bg}`}>
                          <span className="text-base font-bold">{s.count}</span>
                          <span className="text-[9px] uppercase tracking-wider font-bold mt-0.5 leading-tight">{s.label}</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="space-y-4">
                    {MOCK_ORDERS.map((order) => {
                      const statusDetails = getStatusStyle(order.status)
                      return (
                        <div key={order.id} className="border border-[#eaeaea] bg-white overflow-hidden">
                          {/* Order Header */}
                          <div className="px-4 py-3 border-b border-[#eaeaea] bg-[#faf9f8] flex justify-between items-center">
                            <div>
                              <p className="text-[11px] font-bold"># {order.id}</p>
                              <p className="text-[10px] text-[#707072]">{order.date}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-[8px] uppercase tracking-wider font-bold px-2 py-1 border ${statusDetails.bg}`}>
                                {statusDetails.label}
                              </span>
                              <span className="text-[12px] font-bold">Rp {order.total.toLocaleString('id-ID')}</span>
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="p-4 divide-y divide-[#eaeaea]">
                            {order.items.map((item) => (
                              <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex gap-3 items-center">
                                <div className="w-12 h-16 bg-[#f0f0f0] overflow-hidden flex-shrink-0 border border-[#eaeaea]">
                                  <img src={item.img} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-[12px] font-semibold text-[#1a1a1a] truncate">{item.name}</h4>
                                  <p className="text-[10px] text-[#707072] mt-0.5">
                                    {item.color} · {item.size} · {item.quantity}x
                                  </p>
                                </div>
                                <p className="text-[12px] font-bold flex-shrink-0">Rp {item.price.toLocaleString('id-ID')}</p>
                              </div>
                            ))}
                          </div>

                          {/* Order Action Footer */}
                          <div className="px-4 py-3 border-t border-[#eaeaea] flex justify-end gap-2 bg-[#faf9f8]">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="px-4 py-2.5 border border-[#eaeaea] bg-white text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a] hover:bg-neutral-100 transition focus:outline-none min-h-[44px]"
                            >
                              Lacak Pengiriman
                            </button>
                            <Link
                              href={`/products/${order.items[0].id}`}
                              className="px-4 py-2.5 border border-[#1a1a1a] bg-[#1a1a1a] text-white text-[10px] uppercase tracking-widest font-bold hover:opacity-85 transition focus:outline-none min-h-[44px] flex items-center"
                            >
                              Beli Lagi
                            </Link>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ────────────────────────────────────────────────────────────────
                  ③ WISHLIST / SAVED ITEMS
                  ──────────────────────────────────────────────────────────────── */}
              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <div className="border-b border-[#eaeaea] pb-4 flex justify-between items-baseline">
                    <div>
                      <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-normal mb-1">Item Tersimpan</h2>
                      <p className="text-xs text-[#707072]">Item kesukaan yang Anda simpan untuk nanti</p>
                    </div>
                    <p className="text-[10.5px] uppercase tracking-widest font-bold text-[#707072]">{wishlistItems.length} produk</p>
                  </div>

                  {wishlistItems.length === 0 ? (
                    <div className="p-12 text-center border border-[#eaeaea] bg-white">
                      <Heart size={36} className="mx-auto text-neutral-300 mb-4" strokeWidth={1} />
                      <h3 className="text-base font-semibold mb-2">Wishlist Anda Kosong</h3>
                      <p className="text-xs text-[#555] mb-6 max-w-sm mx-auto">Tambahkan produk baru ke wishlist dengan menekan tombol simpan di halaman rincian produk.</p>
                      <Link href="/products" className="inline-flex bg-[#1a1a1a] text-white text-[10.5px] uppercase tracking-widest font-bold px-6 py-3.5 hover:opacity-85 transition">
                        Belanja Sekarang
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {wishlistItems.map((product) => (
                        <div key={product.id} className="group relative border border-[#eaeaea] bg-white p-2.5 sm:p-3 flex flex-col justify-between">
                          <div className="relative bg-[#f0f0f0] aspect-[3/4] mb-3 overflow-hidden">
                            <img
                              src={product.variants[0]?.imgs[0] || ''}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Remove button */}
                            <button
                              onClick={() => handleRemoveFromWishlist(product.id)}
                              className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-red-500 shadow-md transition"
                              title="Hapus dari Wishlist"
                            >
                              <X size={13} />
                            </button>
                            <button
                              onClick={() => openQuickView(product)}
                              className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-wider py-2.5 md:py-3 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300"
                            >
                              Beli Cepat
                            </button>
                          </div>
                          <div>
                            <h4 className="text-[13px] font-semibold truncate mb-0.5">{product.name}</h4>
                            <p className="text-[9.5px] uppercase tracking-wider text-[#707072] mb-2">{product.category}</p>
                            <div className="flex justify-between items-baseline">
                              <span className="text-[13px] font-bold">Rp {product.price.toLocaleString('id-ID')}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ────────────────────────────────────────────────────────────────
                  ④ SAVED ADDRESSES
                  ──────────────────────────────────────────────────────────────── */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="border-b border-[#eaeaea] pb-4 flex justify-between items-baseline">
                    <div>
                      <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-normal mb-1">Buku Alamat</h2>
                      <p className="text-xs text-[#707072]">Kelola alamat untuk pengiriman pesanan Anda</p>
                    </div>
                    {!showAddressForm && (
                      <button
                        onClick={() => setShowAddressForm(true)}
                        className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold border-b border-[#1a1a1a] pb-0.5 hover:text-neutral-500 transition focus:outline-none min-h-[36px] sm:min-h-0"
                      >
                        <Plus size={13} /> Tambah Alamat
                      </button>
                    )}
                  </div>

                  {/* Add Address Form */}
                  <AnimatePresence>
                    {showAddressForm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-5 border border-[#eaeaea] bg-[#f3efe9] overflow-hidden"
                      >
                        <form onSubmit={handleAddAddress} className="space-y-4">
                          <h3 className="text-sm font-semibold uppercase tracking-widest mb-3 text-neutral-800">Alamat Baru</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Label Alamat (cth: Rumah, Kantor)</label>
                              <input
                                type="text"
                                required
                                value={newAddressForm.label}
                                onChange={e => setNewAddressForm({ ...newAddressForm, label: e.target.value })}
                                className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Nama Penerima</label>
                              <input
                                type="text"
                                required
                                value={newAddressForm.receiver}
                                onChange={e => setNewAddressForm({ ...newAddressForm, receiver: e.target.value })}
                                className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Nomor Telepon</label>
                              <input
                                type="tel"
                                required
                                value={newAddressForm.phone}
                                onChange={e => setNewAddressForm({ ...newAddressForm, phone: e.target.value })}
                                className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Alamat Jalan</label>
                              <input
                                type="text"
                                required
                                value={newAddressForm.address}
                                onChange={e => setNewAddressForm({ ...newAddressForm, address: e.target.value })}
                                className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Kota / Kab</label>
                              <input
                                type="text"
                                required
                                value={newAddressForm.city}
                                onChange={e => setNewAddressForm({ ...newAddressForm, city: e.target.value })}
                                className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Provinsi</label>
                              <input
                                type="text"
                                required
                                value={newAddressForm.province}
                                onChange={e => setNewAddressForm({ ...newAddressForm, province: e.target.value })}
                                className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Kode Pos</label>
                              <input
                                type="text"
                                required
                                value={newAddressForm.zip}
                                onChange={e => setNewAddressForm({ ...newAddressForm, zip: e.target.value })}
                                className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-3 pt-2">
                            <button
                              type="button"
                              onClick={() => setShowAddressForm(false)}
                              className="px-4 py-2.5 bg-transparent text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a] hover:underline focus:outline-none min-h-[44px]"
                            >
                              Batal
                            </button>
                            <button
                              type="submit"
                              className="px-5 py-2.5 bg-[#1a1a1a] text-white text-[10px] uppercase tracking-widest font-bold hover:opacity-85 transition focus:outline-none min-h-[44px]"
                            >
                              Simpan Alamat
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="p-4 sm:p-5 border bg-white flex flex-col justify-between"
                        style={{ borderColor: addr.isDefault ? '#1a1a1a' : '#eaeaea', borderWidth: addr.isDefault ? '1.5px' : '1px' }}
                      >
                        <div>
                          <div className="flex justify-between items-baseline mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-widest bg-[#f3efe9] px-2 py-0.5 text-[#1a1a1a]">
                              {addr.label}
                            </span>
                            {addr.isDefault && (
                              <span className="text-[9px] uppercase tracking-[1.5px] font-bold text-[#007D48]">Default</span>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-neutral-800">{addr.receiver}</p>
                          <p className="text-xs text-[#555] mt-1">{addr.address}</p>
                          <p className="text-xs text-[#555]">{addr.city}, {addr.province} {addr.zip}</p>
                          <p className="text-xs text-[#707072] mt-2 flex items-center gap-1.5">
                            <Smartphone size={13} /> {addr.phone}
                          </p>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-[#eaeaea] pt-4 mt-5">
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="text-[10px] uppercase tracking-widest font-bold text-red-500 hover:text-red-700 transition flex items-center gap-1.5 focus:outline-none min-h-[36px] sm:min-h-0"
                          >
                            <Trash2 size={13} /> Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ────────────────────────────────────────────────────────────────
                  ⑤ PAYMENT METHODS
                  ──────────────────────────────────────────────────────────────── */}
              {activeTab === 'payments' && (
                <div className="space-y-6">
                  <div className="border-b border-[#eaeaea] pb-4 flex justify-between items-baseline">
                    <div>
                      <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-normal mb-1">Metode Pembayaran</h2>
                      <p className="text-xs text-[#707072]">Kelola kartu kredit dan metode pembayaran Anda</p>
                    </div>
                    {!showCardForm && (
                      <button
                        onClick={() => setShowCardForm(true)}
                        className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold border-b border-[#1a1a1a] pb-0.5 hover:text-neutral-500 transition focus:outline-none min-h-[36px] sm:min-h-0"
                      >
                        <Plus size={13} /> Tambah Kartu
                      </button>
                    )}
                  </div>

                  {/* Add Card Form */}
                  <AnimatePresence>
                    {showCardForm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 sm:p-5 border border-[#eaeaea] bg-[#f3efe9] overflow-hidden"
                      >
                        <form onSubmit={handleAddCard} className="space-y-4">
                          <h3 className="text-sm font-semibold uppercase tracking-widest mb-3 text-neutral-800">Kartu Kredit/Debit Baru</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Tipe Kartu</label>
                              <select
                                value={newCardForm.type}
                                onChange={e => setNewCardForm({ ...newCardForm, type: e.target.value })}
                                className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                              >
                                <option value="visa">Visa</option>
                                <option value="mastercard">Mastercard</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Nama Pemegang Kartu</label>
                              <input
                                type="text"
                                required
                                placeholder="CTH: ALEXANDER VOGUE"
                                value={newCardForm.holder}
                                onChange={e => setNewCardForm({ ...newCardForm, holder: e.target.value })}
                                className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Nomor Kartu</label>
                              <input
                                type="text"
                                required
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                                value={newCardForm.number}
                                onChange={e => {
                                  // Add spacing for formatting
                                  const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
                                  setNewCardForm({ ...newCardForm, number: val })
                                }}
                                className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Masa Berlaku</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="MM/YY"
                                  maxLength={5}
                                  value={newCardForm.expiry}
                                  onChange={e => {
                                    let val = e.target.value.replace(/\D/g, '')
                                    if (val.length > 2) val = `${val.slice(0, 2)}/${val.slice(2, 4)}`
                                    setNewCardForm({ ...newCardForm, expiry: val })
                                  }}
                                  className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">CVC / CVV</label>
                                <input
                                  type="password"
                                  required
                                  placeholder="123"
                                  maxLength={3}
                                  value={newCardForm.cvc}
                                  onChange={e => setNewCardForm({ ...newCardForm, cvc: e.target.value.replace(/\D/g, '') })}
                                  className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-3 pt-2">
                            <button
                              type="button"
                              onClick={() => setShowCardForm(false)}
                              className="px-4 py-2.5 bg-transparent text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a] hover:underline focus:outline-none min-h-[44px]"
                            >
                              Batal
                            </button>
                            <button
                              type="submit"
                              className="px-5 py-2.5 bg-[#1a1a1a] text-white text-[10px] uppercase tracking-widest font-bold hover:opacity-85 transition focus:outline-none min-h-[44px]"
                            >
                              Simpan Kartu
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Cards Display Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className={`relative rounded-xl p-5 sm:p-6 bg-gradient-to-tr ${card.color} ${card.text} shadow-xl flex flex-col justify-between aspect-[1.586/1] border border-white/10`}
                      >
                        {/* Chip & Logo */}
                        <div className="flex justify-between items-start">
                          {/* Gold metallic chip detail */}
                          <div className="w-10 h-7 rounded bg-amber-400/40 border border-amber-300/30 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_45%,#00000020_45%,#00000020_55%,transparent_55%)] bg-[size:6px_100%]"></div>
                          </div>
                          <span className={`text-lg sm:text-xl font-black italic uppercase tracking-wider ${card.brandColor}`}>
                            {card.type}
                          </span>
                        </div>

                        {/* Card Number */}
                        <div className="my-4 sm:my-6">
                          <p className="text-base sm:text-lg md:text-xl tracking-[3px] sm:tracking-[4px] font-mono truncate">{card.number}</p>
                        </div>

                        {/* Card Footer Details */}
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[7.5px] sm:text-[8px] uppercase tracking-widest opacity-60">Card Holder</p>
                            <p className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold truncate max-w-[130px]">{card.holder}</p>
                          </div>
                          <div className="text-right flex items-center gap-3 sm:gap-4">
                            <div>
                              <p className="text-[7.5px] sm:text-[8px] uppercase tracking-widest opacity-60">Expires</p>
                              <p className="text-[11px] sm:text-xs font-semibold">{card.expiry}</p>
                            </div>
                            <button
                              onClick={() => handleDeleteCard(card.id)}
                              className="p-2 sm:p-1.5 rounded-full bg-white/10 hover:bg-red-500/20 text-white/80 hover:text-red-400 transition min-h-[32px] min-w-[32px] flex items-center justify-center"
                              title="Hapus Kartu"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ────────────────────────────────────────────────────────────────
                  ⑥ ACCOUNT SETTINGS
                  ──────────────────────────────────────────────────────────────── */}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  {/* Settings Header */}
                  <div className="border-b border-[#eaeaea] pb-4">
                    <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-normal mb-1">Pengaturan Akun</h2>
                    <p className="text-xs text-[#707072]">Konfigurasikan informasi pribadi dan preferensi keamanan Anda</p>
                  </div>

                  {/* Personal Info Card */}
                  <div className="p-5 sm:p-6 border border-[#eaeaea] bg-white space-y-6">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-[#1a1a1a] flex items-center gap-2">
                      <User size={16} strokeWidth={1.5} /> Informasi Pribadi
                    </h3>

                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Nama Lengkap</label>
                          <input
                            type="text"
                            required
                            value={profileForm.name}
                            onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                            className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Nomor Telepon</label>
                          <input
                            type="tel"
                            value={profileForm.phone}
                            onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                            className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Tanggal Lahir</label>
                          <input
                            type="date"
                            value={profileForm.birthdate}
                            onChange={e => setProfileForm({ ...profileForm, birthdate: e.target.value })}
                            className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Jenis Kelamin</label>
                          <div className="flex gap-4 pt-2">
                            {['male', 'female', 'other'].map(gender => (
                              <label key={gender} className="inline-flex items-center text-xs gap-1.5 cursor-pointer min-h-[36px]">
                                <input
                                  type="radio"
                                  name="gender"
                                  value={gender}
                                  checked={profileForm.gender === gender}
                                  onChange={e => setProfileForm({ ...profileForm, gender: e.target.value })}
                                  className="text-black focus:ring-black w-4 h-4"
                                />
                                <span className="capitalize">{gender === 'male' ? 'Laki-laki' : gender === 'female' ? 'Perempuan' : 'Lainnya'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          disabled={updatingProfile}
                          className="w-full sm:w-auto px-6 py-3 bg-[#1a1a1a] text-white text-[10.5px] uppercase tracking-widest font-bold hover:opacity-85 transition disabled:opacity-50 flex items-center justify-center gap-2 focus:outline-none min-h-[44px]"
                        >
                          {updatingProfile && <Loader2 size={13} className="animate-spin" />}
                          Simpan Perubahan
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Security (Change Password) */}
                  <div className="p-5 sm:p-6 border border-[#eaeaea] bg-white space-y-6">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-[#1a1a1a] flex items-center gap-2">
                      <Shield size={16} strokeWidth={1.5} /> Keamanan & Password
                    </h3>

                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Password Saat Ini</label>
                        <input
                          type="password"
                          required
                          value={securityForm.password}
                          onChange={e => setSecurityForm({ ...securityForm, password: e.target.value })}
                          className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black max-w-md min-h-[44px]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Password Baru</label>
                          <input
                            type="password"
                            required
                            value={securityForm.newPassword}
                            onChange={e => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                            className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Konfirmasi Password Baru</label>
                          <input
                            type="password"
                            required
                            value={securityForm.confirmPassword}
                            onChange={e => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                            className="w-full px-3 py-2.5 sm:py-2 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          disabled={updatingProfile}
                          className="w-full sm:w-auto px-6 py-3 bg-[#1a1a1a] text-white text-[10.5px] uppercase tracking-widest font-bold hover:opacity-85 transition disabled:opacity-50 flex items-center justify-center gap-2 focus:outline-none min-h-[44px]"
                        >
                          {updatingProfile && <Loader2 size={13} className="animate-spin" />}
                          Perbarui Password
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Preferences Group (Notifications & Privacy & Appearance) */}
                  <div className="flex flex-col gap-6">
                    {/* Notification Settings */}
                    <div className="p-5 sm:p-6 border border-[#eaeaea] bg-white space-y-4">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-[#1a1a1a] flex items-center gap-2 mb-2">
                        <Bell size={16} strokeWidth={1.5} /> Preferensi Notifikasi
                      </h3>
                      {[
                        { key: 'email', title: 'Notifikasi Email', desc: 'Terima info pengiriman & tagihan via email' },
                        { key: 'sms', title: 'Notifikasi SMS', desc: 'Dapatkan SMS konfirmasi pengiriman barang' },
                        { key: 'push', title: 'Notifikasi Web Push', desc: 'Notifikasi di browser saat ada promo & update' },
                        { key: 'promo', title: 'Katalog Promosi', desc: 'Terima penawaran produk baru mingguan' }
                      ].map((item) => (
                        <label key={item.key} className="flex gap-3 items-start cursor-pointer group min-h-[44px] py-1">
                          <input
                            type="checkbox"
                            checked={(prefNotification as any)[item.key]}
                            onChange={e => setPrefNotification({ ...prefNotification, [item.key]: e.target.checked })}
                            className="mt-1 text-black focus:ring-black w-4 h-4"
                          />
                          <div>
                            <p className="text-xs font-semibold group-hover:text-neutral-600 transition">{item.title}</p>
                            <p className="text-[10px] text-[#707072]">{item.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Privacy & Appearance */}
                    <div className="space-y-6">
                      {/* Privacy card */}
                      <div className="p-5 sm:p-6 border border-[#eaeaea] bg-white space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-[#1a1a1a] flex items-center gap-2 mb-2">
                          <Shield size={16} strokeWidth={1.5} /> Keamanan & Privasi
                        </h3>
                        <label className="flex gap-3 items-start cursor-pointer group min-h-[44px] py-1">
                          <input
                            type="checkbox"
                            checked={prefPrivacy.cookies}
                            onChange={e => setPrefPrivacy({ ...prefPrivacy, cookies: e.target.checked })}
                            className="mt-1 text-black focus:ring-black w-4 h-4"
                          />
                          <div>
                            <p className="text-xs font-semibold group-hover:text-neutral-600 transition">Cookies Fungsional</p>
                            <p className="text-[10px] text-[#707072]">Simpan pencarian terakhir & saran produk</p>
                          </div>
                        </label>
                        <label className="flex gap-3 items-start cursor-pointer group min-h-[44px] py-1">
                          <input
                            type="checkbox"
                            checked={prefPrivacy.publicProfile}
                            onChange={e => setPrefPrivacy({ ...prefPrivacy, publicProfile: e.target.checked })}
                            className="mt-1 text-black focus:ring-black w-4 h-4"
                          />
                          <div>
                            <p className="text-xs font-semibold group-hover:text-neutral-600 transition">Profil Publik</p>
                            <p className="text-[10px] text-[#707072]">Izinkan ulasan yang Anda buat menampilkan nama Anda</p>
                          </div>
                        </label>
                      </div>

                      {/* Appearance Card */}
                      <div className="p-5 sm:p-6 border border-[#eaeaea] bg-white space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-[#1a1a1a] flex items-center gap-2 mb-2">
                          <Eye size={16} strokeWidth={1.5} /> Kerapatan Halaman
                        </h3>
                        <div className="flex gap-3">
                          {['editorial', 'cozy'].map((density) => (
                            <button
                              key={density}
                              type="button"
                              onClick={() => {
                                setPrefDensity(density as any)
                                triggerToast(`Kerapatan disetel ke ${density === 'editorial' ? 'Editorial (Lebar)' : 'Cozy (Padat)'}`)
                              }}
                              className={`flex-1 py-2 text-[10px] uppercase tracking-widest font-bold border transition focus:outline-none min-h-[44px] ${
                                prefDensity === density
                                  ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                                  : 'bg-white border-[#eaeaea] text-[#1a1a1a] hover:bg-[#faf9f8]'
                              }`}
                            >
                              {density === 'editorial' ? 'Editorial' : 'Rapat'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      {/* ─── MODAL DIALOGS (PORTALS SIMULATED) ────────────────────────────────── */}

      {/* ① ORDER DETAIL MODAL */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-0 md:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative bg-white border border-[#eaeaea] w-full max-w-xl shadow-2xl overflow-hidden flex flex-col h-[85vh] md:h-auto md:max-h-[85vh] z-10 rounded-t-2xl md:rounded-none"
            >
              {/* Drag Handle for Mobile */}
              <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto my-3 md:hidden flex-shrink-0" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-4 right-4 p-2 text-[#707072] hover:text-[#1a1a1a] transition"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="p-6 border-b border-[#eaeaea] bg-[#f3efe9]">
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#707072] mb-1">DETAIL PESANAN</p>
                <h3 className="text-xl font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>Order #{selectedOrder.id}</h3>
                <p className="text-[11px] text-[#555] mt-1">Dipesan pada {selectedOrder.date}</p>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none">
                {/* Tracking Progress Timeline */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#707072] mb-4">STATUS PENGIRIMAN</h4>
                  <div className="relative flex justify-between items-center w-full px-2">
                    {/* Progress line */}
                    <div className="absolute left-8 right-8 top-4 h-0.5 bg-[#eaeaea] z-0">
                      <div
                        className="h-full bg-[#1a1a1a] transition-all duration-500"
                        style={{
                          width:
                            selectedOrder.status === 'Processing'
                              ? '33%'
                              : selectedOrder.status === 'Shipped'
                              ? '66%'
                              : selectedOrder.status === 'Delivered'
                              ? '100%'
                              : '0%'
                        }}
                      />
                    </div>

                    {[
                      { key: 'Processing', label: 'Diproses' },
                      { key: 'Shipped', label: 'Dikirim' },
                      { key: 'Delivered', label: 'Terkirim' }
                    ].map((step, idx) => {
                      const orderStatusIdx = ['Processing', 'Shipped', 'Delivered'].indexOf(selectedOrder.status)
                      const stepIdx = ['Processing', 'Shipped', 'Delivered'].indexOf(step.key)
                      const isCompleted = orderStatusIdx >= stepIdx && selectedOrder.status !== 'Cancelled'
                      const isCurrent = selectedOrder.status === step.key

                      return (
                        <div key={step.key} className="flex flex-col items-center z-10 relative">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                              isCompleted
                                ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white'
                                : 'bg-white border-gray-300 text-gray-400'
                            } ${isCurrent ? 'ring-4 ring-neutral-200' : ''}`}
                          >
                            <Check size={13} strokeWidth={3} />
                          </div>
                          <span className="text-[9px] uppercase tracking-wider font-bold mt-2 text-[#1a1a1a]">{step.label}</span>
                        </div>
                      )
                    })}
                  </div>
                  {selectedOrder.status === 'Cancelled' && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs mt-4 uppercase tracking-wider font-bold text-center">
                      Pesanan Ini Telah Dibatalkan
                    </div>
                  )}
                </div>

                {/* Shipping Details */}
                <div className="p-4 border border-[#eaeaea] bg-[#faf9f8] space-y-2">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#707072]">ALAMAT PENGIRIMAN</h4>
                  <p className="text-xs font-semibold">{selectedOrder.address.split(',')[0]}</p>
                  <p className="text-xs text-[#555] leading-relaxed">{selectedOrder.address}</p>
                  <p className="text-xs text-[#707072] pt-1 border-t border-[#eaeaea]">
                    Metode: <strong className="text-[#1a1a1a]">{selectedOrder.deliveryMethod}</strong>
                  </p>
                </div>

                {/* Items list */}
                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#707072]">ITEM PRODUK</h4>
                  {selectedOrder.items.map((item: any) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-12 h-16 bg-[#f0f0f0] overflow-hidden flex-shrink-0 border border-[#eaeaea]">
                        <img src={item.img} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-[12.5px] font-semibold truncate text-[#1a1a1a]">{item.name}</h5>
                        <p className="text-[10px] text-[#707072]">
                          Varian: {item.color} · Ukuran: {item.size}
                        </p>
                        <p className="text-[10px] text-[#707072]">Jumlah: {item.quantity}x</p>
                      </div>
                      <p className="text-[12.5px] font-bold text-right">Rp {item.price.toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                </div>

                {/* Receipt Pricing breakdown */}
                <div className="pt-4 border-t border-[#eaeaea] space-y-2">
                  <div className="flex justify-between text-xs text-[#555]">
                    <span>Subtotal</span>
                    <span>Rp {selectedOrder.total.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#555]">
                    <span>Pengiriman</span>
                    <span>GRATIS (Express)</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#1a1a1a] pt-1.5 border-t border-dashed border-[#eaeaea]">
                    <span>Total Tagihan</span>
                    <span>Rp {selectedOrder.total.toLocaleString('id-ID')}</span>
                  </div>
                  <p className="text-[9px] uppercase tracking-widest text-[#888] pt-1">
                    Dibayar dengan: {selectedOrder.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Footer Button */}
              <div className="p-4 border-t border-[#eaeaea] bg-[#faf9f8] flex justify-end">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase tracking-widest font-bold hover:opacity-85 transition focus:outline-none min-h-[44px] sm:min-h-0 flex items-center justify-center"
                >
                  Tutup Rincian
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ② WISHLIST PRODUCT QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative bg-white border border-[#eaeaea] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-auto md:max-h-[85vh] z-10 rounded-t-2xl md:rounded-none"
            >
              {/* Drag Handle for Mobile */}
              <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto my-3 md:hidden flex-shrink-0" />

              {/* Close Button */}
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 p-2 text-[#707072] hover:text-[#1a1a1a] transition z-20"
              >
                <X size={18} />
              </button>

              {/* Product Image Gallery (Left Side) */}
              <div className="w-full md:w-1/2 bg-[#f0f0f0] h-52 md:h-auto md:aspect-[3/4] relative overflow-hidden flex-shrink-0">
                <img
                  src={quickViewProduct.variants[qvVariantIdx]?.imgs[0] || ''}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Options (Right Side) */}
              <div className="flex-1 p-5 md:p-6 flex flex-col justify-between overflow-y-auto scrollbar-none">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[2px] text-[#707072] block mb-1">
                      {quickViewProduct.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-normal leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {quickViewProduct.name}
                    </h3>
                    <p className="text-base font-bold text-[#1a1a1a] mt-2">
                      Rp {quickViewProduct.price.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <p className="text-[11.5px] text-[#555] leading-relaxed">
                    {quickViewProduct.description}
                  </p>

                  {/* Varian Colors */}
                  <div>
                    <span className="text-[9.5px] font-bold uppercase tracking-wider block mb-2 text-[#707072]">
                      Warna — {quickViewProduct.variants[qvVariantIdx]?.color}
                    </span>
                    <div className="flex gap-2">
                      {quickViewProduct.variants.map((variant, idx) => (
                        <button
                          key={variant.color}
                          onClick={() => setQvVariantIdx(idx)}
                          className="w-6 h-6 rounded-full border border-gray-300 relative focus:outline-none"
                          style={{
                            backgroundColor:
                              variant.color === 'Black'
                                ? '#111'
                                : variant.color === 'Sand' || variant.color === 'Ecru'
                                ? '#D4CFC8'
                                : '#8B6F6F',
                            outline: qvVariantIdx === idx ? '2px solid #1a1a1a' : 'none',
                            outlineOffset: '1.5px'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <span className="text-[9.5px] font-bold uppercase tracking-wider block mb-2 text-[#707072]">
                      Ukuran — {qvSize}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setQvSize(size)}
                          className="h-8 min-w-[32px] px-2 text-[11px] font-semibold border transition focus:outline-none min-h-[36px]"
                          style={{
                            border: qvSize === size ? '1.5px solid #1a1a1a' : '1px solid #D8D8D8',
                            backgroundColor: qvSize === size ? '#1a1a1a' : '#fff',
                            color: qvSize === size ? '#fff' : '#1a1a1a'
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity picker */}
                  <div>
                    <span className="text-[9.5px] font-bold uppercase tracking-wider block mb-2 text-[#707072]">Jumlah</span>
                    <div className="inline-flex items-center border border-gray-300">
                      <button onClick={() => setQvQty(Math.max(1, qvQty - 1))} className="w-8 h-8 flex items-center justify-center text-sm hover:bg-neutral-100 transition focus:outline-none min-h-[36px] min-w-[36px]">-</button>
                      <span className="w-8 text-center text-xs font-semibold">{qvQty}</span>
                      <button onClick={() => setQvQty(qvQty + 1)} className="w-8 h-8 flex items-center justify-center text-sm hover:bg-neutral-100 transition focus:outline-none min-h-[36px] min-w-[36px]">+</button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#eaeaea] mt-6 flex flex-col gap-2">
                  <button
                    onClick={handleQuickAdd}
                    className="w-full py-3 bg-[#1a1a1a] text-white text-[11px] font-bold uppercase tracking-widest hover:opacity-85 transition flex items-center justify-center gap-2 focus:outline-none min-h-[44px]"
                  >
                    Tambah ke Keranjang
                  </button>
                  <Link
                    href={`/products/${quickViewProduct.id}`}
                    className="w-full py-3 text-center border border-[#1a1a1a] text-[#1a1a1a] text-[11px] font-bold uppercase tracking-widest hover:bg-[#faf9f8] transition focus:outline-none min-h-[44px] flex items-center justify-center"
                  >
                    Detail Produk Selengkapnya
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ③ EDIT NAME & AVATAR MODAL OVERLAY */}
      <AnimatePresence>
        {isEditProfileOpen && (
          <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditProfileOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative bg-white border border-[#eaeaea] w-full max-w-md shadow-2xl p-5 md:p-6 z-10 rounded-t-2xl md:rounded-none max-h-[85vh] overflow-y-auto scrollbar-none flex flex-col"
            >
              {/* Drag Handle for Mobile */}
              <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto mb-4 md:hidden flex-shrink-0" />

              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#707072] hover:text-[#1a1a1a] transition"
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-normal mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Edit Data Profil</h3>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1.5">Avatar URL (Atau pilih preset)</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://..."
                      value={profileForm.image}
                      onChange={e => setProfileForm({ ...profileForm, image: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white text-xs border border-gray-300 focus:outline-none focus:border-black min-h-[44px] flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => setAvatarPresetSelector(!avatarPresetSelector)}
                      className="px-3 bg-neutral-100 hover:bg-neutral-200 border border-gray-300 text-[10px] uppercase font-bold tracking-wider min-h-[44px]"
                    >
                      Presets
                    </button>
                  </div>
                </div>

                {avatarPresetSelector && (
                  <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-2">
                    <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest">Pilih Gambar Preset:</p>
                    <div className="flex gap-2.5">
                      {AVATAR_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setProfileForm({ ...profileForm, image: preset })
                            setAvatarPresetSelector(false)
                          }}
                          className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 hover:scale-105 transition min-h-[44px] min-w-[40px]"
                        >
                          <img src={preset} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsEditProfileOpen(false)}
                    className="px-4 py-2.5 bg-transparent text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a] hover:underline focus:outline-none min-h-[44px]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={updatingProfile}
                    className="px-5 py-2.5 bg-[#1a1a1a] text-white text-[10px] uppercase tracking-widest font-bold hover:opacity-85 transition disabled:opacity-50 flex items-center gap-2 focus:outline-none min-h-[44px]"
                  >
                    {updatingProfile && <Loader2 size={13} className="animate-spin" />}
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ④ AVATAR QUICK SELECTION OVERLAY */}
      <AnimatePresence>
        {avatarPresetSelector && !isEditProfileOpen && (
          <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAvatarPresetSelector(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative bg-white border border-[#eaeaea] w-full max-w-sm shadow-2xl p-5 md:p-6 z-10 space-y-4 rounded-t-2xl md:rounded-none max-h-[85vh] overflow-y-auto scrollbar-none flex flex-col"
            >
              {/* Drag Handle for Mobile */}
              <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto mb-2 md:hidden flex-shrink-0" />

              <button
                onClick={() => setAvatarPresetSelector(false)}
                className="absolute top-4 right-4 p-2 text-[#707072] hover:text-[#1a1a1a] transition"
              >
                <X size={18} />
              </button>

              <h3 className="text-lg font-normal uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>Ubah Foto Profil</h3>
              <p className="text-xs text-[#707072]">Pilih salah satu dari model preset editorial kami di bawah ini:</p>

              <div className="grid grid-cols-5 gap-3 pt-2">
                {AVATAR_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={async () => {
                      setUpdatingProfile(true)
                      try {
                        const res = await fetch('/api/profile/update', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ image: preset })
                        })
                        const data = await res.json()
                        if (!res.ok) throw new Error(data.error || 'Gagal mengubah foto.')
                        triggerToast('Foto profil berhasil diubah.')
                        setAvatarPresetSelector(false)
                        reloadSession()
                      } catch (err: any) {
                        triggerToast(err.message || 'Terjadi kesalahan.', 'error')
                      } finally {
                        setUpdatingProfile(false)
                      }
                    }}
                    className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 hover:scale-110 hover:shadow-md transition focus:outline-none min-h-[48px] min-w-[48px]"
                  >
                    <img src={preset} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setAvatarPresetSelector(false)}
                  className="px-4 py-2.5 border border-[#1a1a1a] text-[10px] uppercase tracking-widest font-bold hover:bg-[#faf9f8] transition focus:outline-none min-h-[44px] w-full sm:w-auto"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <PageFooter />
    </div>
  )
}
