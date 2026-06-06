'use client'

import { Navbar } from '@/components/navbar'
import { PageFooter } from '@/components/page-footer'
import { useState, use, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Star, Heart, Share2, ArrowLeft, Check, ShoppingBag, Zap } from 'lucide-react'

// ─── DATA ──────────────────────────────────────────────────────────────────────

const COLOR_MAP: Record<string, string> = {
  Black: '#111111', White: '#FAFAFA', Tan: '#8B7355', Sand: '#D4CFC8',
  Charcoal: '#4A4A4A', Olive: '#5C6B3A', Cream: '#F5F0E8', Mauve: '#8B6F6F',
  Brown: '#8B6F4E', Ecru: '#E8E4DC', Slate: '#4A5568', Terracotta: '#C4714A',
}

type Product = {
  id: string; name: string; category: string; price: number
  originalPrice?: number; description: string; details: string[]
  sizes: string[]; variants: { color: string; imgs: string[] }[]
  rating: number; reviews: number; inStock: boolean
}

const PRODUCTS: Record<string, Product> = {
  '1': {
    id: '1', name: 'Structured Oversized Jacket', category: "Women's · Outerwear",
    price: 890000, description: 'Jaket oversized struktural yang elegan. Dibuat dari bahan premium dengan detail yang sangat teliti — sempurna untuk tampilan kasual maupun formal.',
    details: ['Material: 80% Polyester, 20% Nylon', 'Fit: Oversized', 'Care: Dry clean only', 'SKU: VOG-OW-001'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Black', imgs: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&h=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'Tan',   imgs: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&h=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'Sand',  imgs: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&h=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&auto=format&fit=crop'] },
    ],
    rating: 4.8, reviews: 124, inStock: true,
  },
  '2': {
    id: '2', name: 'Wide Leg Cargo Pant', category: "Women's · Bottoms",
    price: 650000, description: 'Celana cargo wide leg dengan siluet modern. Kenyamanan maksimal dengan sentuhan editorial yang cocok untuk berbagai kesempatan.',
    details: ['Material: 100% Cotton Twill', 'Fit: Wide Leg', 'Care: Machine wash cold', 'SKU: VOG-BT-002'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Sand',     imgs: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'Charcoal', imgs: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'Olive',    imgs: ['https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&h=1000&auto=format&fit=crop'] },
    ],
    rating: 4.6, reviews: 89, inStock: true,
  },
  '3': {
    id: '3', name: 'Essential Pullover Hoodie', category: "Men's · Tops",
    price: 420000, originalPrice: 600000,
    description: 'Hoodie pullover essential dengan bahan fleece premium. Nyaman sepanjang hari untuk aktivitas sehari-hari.',
    details: ['Material: 70% Cotton, 30% Polyester', 'Fit: Regular', 'Care: Machine wash warm', 'SKU: VOG-TP-003'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Black', imgs: ['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&h=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'Cream', imgs: ['https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'Mauve', imgs: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&auto=format&fit=crop'] },
    ],
    rating: 4.7, reviews: 203, inStock: true,
  },
  '4': {
    id: '4', name: 'Canvas Studio Tote', category: 'Accessories · Bags',
    price: 480000, description: 'Tote bag kanvas studio yang luas dan kuat. Ideal untuk aktivitas sehari-hari dengan gaya yang tetap terjaga.',
    details: ['Material: Heavy Canvas', 'Capacity: ~20L', 'Care: Spot clean', 'SKU: VOG-AC-004'],
    sizes: ['One Size'],
    variants: [
      { color: 'Sand',  imgs: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1544816565-aa8c1166648f?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'Black', imgs: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'Brown', imgs: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&auto=format&fit=crop'] },
    ],
    rating: 4.9, reviews: 67, inStock: true,
  },
  '5': {
    id: '5', name: 'Relaxed Linen Shirt', category: "Men's · Tops",
    price: 540000, description: 'Kemeja linen relaksed dengan cut yang breathable. Sempurna untuk musim panas dan tampilan kasual yang bersih.',
    details: ['Material: 100% Linen', 'Fit: Relaxed', 'Care: Machine wash cold', 'SKU: VOG-TP-005'],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Ecru',      imgs: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'Slate',     imgs: ['https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'Terracotta',imgs: ['https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=800&h=1000&auto=format&fit=crop'] },
    ],
    rating: 4.5, reviews: 91, inStock: true,
  },
  '6': {
    id: '6', name: 'Urban Runner Mono', category: 'Accessories · Footwear',
    price: 1200000, description: 'Sneaker urban monokrom dengan desain minimalis dan sol yang nyaman untuk pemakaian seharian.',
    details: ['Material: Mesh + Rubber Sole', 'Fit: True to size', 'Care: Wipe clean', 'SKU: VOG-FW-006'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    variants: [
      { color: 'Black', imgs: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'White', imgs: ['https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=1000&auto=format&fit=crop'] },
    ],
    rating: 4.8, reviews: 156, inStock: true,
  },
  '7': {
    id: '7', name: 'Ribbed Knit Sweater', category: "Women's · Tops",
    price: 384000, originalPrice: 480000,
    description: 'Sweater rajut ribbed dengan tekstur hangat dan gaya. Tersedia dalam berbagai warna netral yang mudah dipadukan.',
    details: ['Material: 80% Acrylic, 20% Wool', 'Fit: Slim', 'Care: Hand wash cold', 'SKU: VOG-TP-007'],
    sizes: ['XS', 'S', 'M', 'L'],
    variants: [
      { color: 'Mauve', imgs: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'Sand',  imgs: ['https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'Slate', imgs: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&auto=format&fit=crop'] },
    ],
    rating: 4.6, reviews: 78, inStock: true,
  },
  '8': {
    id: '8', name: 'Logo 5-Panel Cap', category: 'Accessories · Headwear',
    price: 280000, description: 'Topi 5-panel dengan bordir logo Vogueir yang subtle. Finishing premium dan tahan lama untuk berbagai aktivitas.',
    details: ['Material: Cotton Twill', 'Fit: Adjustable strap', 'Care: Spot clean', 'SKU: VOG-AC-008'],
    sizes: ['One Size'],
    variants: [
      { color: 'Black', imgs: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'White', imgs: ['https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'Slate', imgs: ['https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&h=1000&auto=format&fit=crop'] },
    ],
    rating: 4.7, reviews: 44, inStock: true,
  },
}

const ALL_PRODUCTS_LIST = Object.values(PRODUCTS)

// ─── TOAST ─────────────────────────────────────────────────────────────────────
function Toast({ visible }: { visible: boolean }) {
  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 flex items-center gap-3 px-5 py-4 shadow-xl"
      style={{
        transform: `translateX(-50%) translateY(${visible ? '0' : '80px'})`,
        opacity: visible ? 1 : 0,
        transition: 'transform 400ms cubic-bezier(0.34,1.56,0.64,1), opacity 300ms ease',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        minWidth: '260px',
        pointerEvents: 'none',
      }}
    >
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 flex-shrink-0">
        <Check size={13} strokeWidth={2.5} />
      </span>
      <span className="text-[13px] font-medium">Produk berhasil ditambahkan ke keranjang.</span>
    </div>
  )
}

// ─── STAR RATING ───────────────────────────────────────────────────────────────
function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={13}
            className="text-[#1a1a1a]"
            fill={i <= Math.floor(rating) ? 'currentColor' : i - 0.5 <= rating ? 'currentColor' : 'none'}
            style={{ opacity: i - 0.5 <= rating && i > Math.floor(rating) ? 0.4 : 1 }}
          />
        ))}
      </div>
      <span className="text-[12px] text-[#707072]">{rating} · {reviews} ulasan</span>
    </div>
  )
}

// ─── PRODUCT CARD (recommendation) ────────────────────────────────────────────
function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.id}`} className="group block">
      <div className="relative bg-[#f0f0f0] aspect-[3/4] overflow-hidden mb-3">
        <img
          src={p.variants[0].imgs[0]}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {p.originalPrice && (
          <span className="absolute top-2 left-2 bg-[#D30005] text-white text-[10px] font-medium uppercase tracking-wider px-2 py-0.5">
            Sale
          </span>
        )}
      </div>
      <p className="text-[13px] font-medium mb-0.5 group-hover:opacity-70 transition-opacity">{p.name}</p>
      <div className="flex items-center gap-1.5 mb-1">
        <Star size={11} fill="currentColor" className="text-[#1a1a1a]" />
        <span className="text-[11px] text-[#707072]">{p.rating}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-medium" style={{ color: p.originalPrice ? '#D30005' : '#1a1a1a' }}>
          Rp {p.price.toLocaleString('id-ID')}
        </span>
        {p.originalPrice && (
          <span className="text-[11px] text-[#9E9EA0] line-through">Rp {p.originalPrice.toLocaleString('id-ID')}</span>
        )}
      </div>
    </Link>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const product = PRODUCTS[id]

  const [activeVariantIdx, setActiveVariantIdx] = useState(0)
  const [selectedSize, setSelectedSize]         = useState(product?.sizes?.[0] ?? '')
  const [activeImgIdx, setActiveImgIdx]         = useState(0)
  const [imgFading, setImgFading]               = useState(false)
  const [quantity, setQuantity]                 = useState(1)
  const [toast, setToast]                       = useState(false)
  const [wishlist, setWishlist]                 = useState(false)
  const [detailOpen, setDetailOpen]             = useState(false)

  const activeVariant = product?.variants[activeVariantIdx]
  const imgs          = activeVariant?.imgs ?? []

  // smooth image swap
  const switchImg = useCallback((idx: number) => {
    if (idx === activeImgIdx) return
    setImgFading(true)
    setTimeout(() => { setActiveImgIdx(idx); setImgFading(false) }, 220)
  }, [activeImgIdx])

  // ── touch swipe for mobile gallery ───────────────────────────────────────
  const touchStartX = useRef<number | null>(null)
  const touchEndX   = useRef<number | null>(null)

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current   = null
  }
  function onTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.touches[0].clientX
  }
  function onTouchEnd() {
    if (touchStartX.current === null || touchEndX.current === null) return
    const delta = touchStartX.current - touchEndX.current
    if (Math.abs(delta) < 40) return          // ignore tiny moves
    if (delta > 0) {
      // swipe left → next
      const next = (activeImgIdx + 1) % imgs.length
      switchImg(next)
    } else {
      // swipe right → prev
      const prev = (activeImgIdx - 1 + imgs.length) % imgs.length
      switchImg(prev)
    }
    touchStartX.current = null
    touchEndX.current   = null
  }

  // reset image when variant changes
  useEffect(() => { setActiveImgIdx(0) }, [activeVariantIdx])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf9f8' }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-6">
            <p
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-3xl font-normal mb-4"
            >
              Produk tidak ditemukan
            </p>
            <Link href="/products" className="text-sm text-[#555] underline">
              Kembali ke Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  function addToCart() {
    setToast(true)
    setTimeout(() => setToast(false), 2800)
  }

  const recommendations = ALL_PRODUCTS_LIST.filter((p) => p.id !== id).slice(0, 8)

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#faf9f8', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}
    >
      <Navbar />

      {/* ── BREADCRUMB ──────────────────────────────────────────────── */}
      <div
        className="px-6 md:px-10 py-3 flex items-center gap-2 text-[11px] text-[#707072]"
        style={{ borderBottom: '1px solid #eaeaea' }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 hover:text-[#1a1a1a] transition"
        >
          <ArrowLeft size={13} /> Kembali
        </button>
        <span className="mx-1">·</span>
        <Link href="/products" className="hover:text-[#1a1a1a] transition">Shop</Link>
        <span className="mx-1">·</span>
        <span className="text-[#1a1a1a] font-medium truncate max-w-[180px]">{product.name}</span>
      </div>

      {/* ── MAIN PRODUCT SECTION ────────────────────────────────────── */}
      <section className="px-4 md:px-10 py-6 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 max-w-6xl mx-auto">

          {/* ── LEFT: GALLERY ──────────────────────────────────────── */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            {imgs.length > 1 && (
              <div className="hidden md:flex flex-col gap-2 w-16 flex-shrink-0">
                {imgs.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => switchImg(i)}
                    className="relative aspect-[3/4] overflow-hidden flex-shrink-0 transition"
                    style={{
                      outline: activeImgIdx === i ? '2px solid #1a1a1a' : '2px solid transparent',
                      outlineOffset: '2px',
                      opacity: activeImgIdx === i ? 1 : 0.55,
                    }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main image — desktop: fade transition, mobile: swipeable strip */}

            {/* Desktop main image */}
            <div className="relative flex-1 bg-[#f0f0f0] overflow-hidden hidden md:block" style={{ aspectRatio: '3/4' }}>
              <img
                src={imgs[activeImgIdx]}
                alt={product.name}
                className="w-full h-full object-cover"
                style={{ opacity: imgFading ? 0 : 1, transition: 'opacity 220ms ease' }}
              />
              {product.originalPrice && (
                <span className="absolute top-3 left-3 bg-[#D30005] text-white text-[10px] font-medium uppercase tracking-wider px-2.5 py-1">
                  Sale
                </span>
              )}
            </div>

            {/* Mobile swipeable image strip */}
            <div
              className="relative md:hidden w-full overflow-hidden bg-[#f0f0f0]"
              style={{ aspectRatio: '3/4' }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* sliding track */}
              <div
                className="flex h-full"
                style={{
                  width: `${imgs.length * 100}%`,
                  transform: `translateX(-${(activeImgIdx / imgs.length) * 100}%)`,
                  transition: imgFading ? 'none' : 'transform 320ms cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              >
                {imgs.map((src, i) => (
                  <div key={i} className="h-full flex-shrink-0" style={{ width: `${100 / imgs.length}%` }}>
                    <img src={src} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* sale badge */}
              {product.originalPrice && (
                <span className="absolute top-3 left-3 bg-[#D30005] text-white text-[10px] font-medium uppercase tracking-wider px-2.5 py-1">
                  Sale
                </span>
              )}

              {/* dot indicators */}
              {imgs.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {imgs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => switchImg(i)}
                      className="rounded-full transition-all"
                      style={{
                        width: activeImgIdx === i ? '18px' : '6px',
                        height: '6px',
                        backgroundColor: '#fff',
                        opacity: activeImgIdx === i ? 1 : 0.5,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* arrow buttons */}
              {imgs.length > 1 && (
                <>
                  <button
                    onClick={() => switchImg((activeImgIdx - 1 + imgs.length) % imgs.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition text-[#1a1a1a]"
                    style={{ display: activeImgIdx === 0 ? 'none' : 'flex' }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => switchImg((activeImgIdx + 1) % imgs.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition text-[#1a1a1a]"
                    style={{ display: activeImgIdx === imgs.length - 1 ? 'none' : 'flex' }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ── RIGHT: INFO ────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Category + name + rating + price */}
            <div>
              <p className="text-[11px] uppercase tracking-[2px] text-[#707072] mb-2">{product.category}</p>
              <h1
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-3xl md:text-4xl font-normal leading-tight mb-3"
              >
                {product.name}
              </h1>
              <StarRating rating={product.rating} reviews={product.reviews} />
              <div className="flex items-baseline gap-3 mt-3">
                <span
                  className="text-2xl font-semibold"
                  style={{ color: product.originalPrice ? '#D30005' : '#1a1a1a' }}
                >
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-[#9E9EA0] line-through">
                      Rp {product.originalPrice.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[11px] font-semibold text-[#D30005] bg-red-50 px-2 py-0.5">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Desc */}
            <p className="text-[13px] text-[#555] leading-relaxed">{product.description}</p>

            {/* Color swatches */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-2.5">
                Warna — <span className="font-normal text-[#555]">{activeVariant.color}</span>
              </p>
              <div className="flex gap-2">
                {product.variants.map((v, i) => {
                  const bg = COLOR_MAP[v.color] ?? '#ccc'
                  const isLight = ['Sand', 'Cream', 'Ecru', 'White'].includes(v.color)
                  return (
                    <button
                      key={v.color}
                      title={v.color}
                      onClick={() => setActiveVariantIdx(i)}
                      className="relative w-8 h-8 rounded-full transition-transform hover:scale-110"
                      style={{
                        backgroundColor: bg,
                        border: isLight ? '1px solid #D8D8D8' : 'none',
                        outline: activeVariantIdx === i ? '2px solid #1a1a1a' : '2px solid transparent',
                        outlineOffset: '2px',
                      }}
                    >
                      {activeVariantIdx === i && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check size={11} style={{ color: isLight ? '#1a1a1a' : '#fff' }} strokeWidth={2.5} />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider">
                  Ukuran — <span className="font-normal text-[#555]">{selectedSize}</span>
                </p>
                <button className="text-[11px] text-[#555] underline underline-offset-2 hover:text-[#1a1a1a] transition">
                  Panduan Ukuran
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className="h-10 min-w-[40px] px-3 text-[12px] font-medium transition-all"
                    style={{
                      border: selectedSize === sz ? '1.5px solid #1a1a1a' : '1px solid #D8D8D8',
                      backgroundColor: selectedSize === sz ? '#1a1a1a' : '#fff',
                      color: selectedSize === sz ? '#fff' : '#1a1a1a',
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-2.5">Jumlah</p>
              <div className="inline-flex items-center" style={{ border: '1px solid #D8D8D8' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg hover:bg-[#f3efe9] transition">−</button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-lg hover:bg-[#f3efe9] transition">+</button>
              </div>
            </div>

            {/* Action buttons — desktop */}
            <div className="hidden md:flex flex-col gap-2.5">
              <button
                onClick={addToCart}
                className="w-full py-4 text-[12px] font-semibold uppercase tracking-widest bg-[#1a1a1a] text-white hover:opacity-80 transition flex items-center justify-center gap-2"
              >
                <ShoppingBag size={15} /> Tambah ke Keranjang
              </button>
              <button className="w-full py-4 text-[12px] font-semibold uppercase tracking-widest border hover:bg-[#f3efe9] transition flex items-center justify-center gap-2" style={{ borderColor: '#1a1a1a' }}>
                <Zap size={15} /> Beli Sekarang
              </button>
              <button
                onClick={() => setWishlist(!wishlist)}
                className="w-full py-3 text-[12px] font-medium uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#f3efe9] transition"
                style={{ border: '1px solid #D8D8D8' }}
              >
                <Heart size={14} fill={wishlist ? 'currentColor' : 'none'} />
                {wishlist ? 'Tersimpan' : 'Simpan'}
              </button>
            </div>

            {/* Info strip */}
            <div className="flex flex-col gap-2.5 pt-1" style={{ borderTop: '1px solid #eaeaea' }}>
              {[
                { icon: '✓', label: product.inStock ? 'Tersedia · Siap kirim' : 'Stok habis' },
                { icon: '→', label: 'Gratis ongkir pembelian di atas Rp 500.000' },
                { icon: '↩', label: 'Retur mudah dalam 7 hari' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <span className="text-[12px] text-[#1a1a1a] mt-0.5 flex-shrink-0">{item.icon}</span>
                  <span className="text-[12px] text-[#555]">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Product details accordion */}
            <div style={{ borderTop: '1px solid #eaeaea' }}>
              <button
                onClick={() => setDetailOpen(!detailOpen)}
                className="w-full flex items-center justify-between py-3 text-left"
              >
                <span className="text-[12px] font-semibold uppercase tracking-wider">Detail Produk</span>
                <span className="text-lg leading-none" style={{ transform: detailOpen ? 'rotate(45deg)' : 'none', transition: 'transform 200ms' }}>+</span>
              </button>
              {detailOpen && (
                <ul className="pb-3 space-y-1.5">
                  {product.details.map((d) => (
                    <li key={d} className="text-[12px] text-[#555] flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#999] flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── RECOMMENDATIONS ─────────────────────────────────────────── */}
      <section className="px-4 md:px-10 py-10 md:py-14" style={{ borderTop: '1px solid #eaeaea' }}>
        <h2
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-2xl md:text-3xl font-normal mb-8"
        >
          Mungkin Kamu Juga Suka
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {recommendations.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <PageFooter />

      {/* ── MOBILE STICKY BAR ───────────────────────────────────────── */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex gap-2 px-4 py-3"
        style={{ backgroundColor: '#faf9f8', borderTop: '1px solid #eaeaea' }}
      >
        <button
          onClick={() => setWishlist(!wishlist)}
          className="w-12 h-12 flex items-center justify-center border hover:bg-[#f3efe9] transition flex-shrink-0"
          style={{ borderColor: '#D8D8D8' }}
        >
          <Heart size={18} fill={wishlist ? 'currentColor' : 'none'} />
        </button>
        <button
          onClick={addToCart}
          className="flex-1 h-12 bg-[#1a1a1a] text-white text-[12px] font-semibold uppercase tracking-widest hover:opacity-80 transition flex items-center justify-center gap-2"
        >
          <ShoppingBag size={15} /> Tambah ke Keranjang
        </button>
      </div>

      {/* ── TOAST ───────────────────────────────────────────────────── */}
      <Toast visible={toast} />
    </div>
  )
}
