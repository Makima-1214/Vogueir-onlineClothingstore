'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  Eye,
  ChevronRight,
} from 'lucide-react'

interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minSpend: number
  expiryDate: string
  usageLimit: number
  usedCount: number
  status: 'active' | 'expired' | 'inactive'
}

interface FeaturedItem {
  id: string
  title: string
  type: 'banner' | 'product' | 'collection'
  placement: string
  status: 'active' | 'scheduled' | 'inactive'
}

const COUPONS: Coupon[] = [
  {
    id: '1',
    code: 'SUMMER20',
    type: 'percentage',
    value: 20,
    minSpend: 50,
    expiryDate: '2024-08-31',
    usageLimit: 100,
    usedCount: 45,
    status: 'active',
  },
  {
    id: '2',
    code: 'WELCOME10',
    type: 'fixed',
    value: 10,
    minSpend: 30,
    expiryDate: '2024-12-31',
    usageLimit: 500,
    usedCount: 234,
    status: 'active',
  },
  {
    id: '3',
    code: 'FLASH15',
    type: 'percentage',
    value: 15,
    minSpend: 75,
    expiryDate: '2024-06-15',
    usageLimit: 50,
    usedCount: 50,
    status: 'expired',
  },
]

const FEATURED_ITEMS: FeaturedItem[] = [
  {
    id: '1',
    title: 'Summer Collection',
    type: 'collection',
    placement: 'Homepage Banner',
    status: 'active',
  },
  {
    id: '2',
    title: 'New Arrivals',
    type: 'product',
    placement: 'Featured Products',
    status: 'active',
  },
  {
    id: '3',
    title: 'Sale Items',
    type: 'banner',
    placement: 'Homepage Banner',
    status: 'scheduled',
  },
]

export default function MarketingPage() {
  const [coupons, setCoupons] = useState(COUPONS)
  const [featured, setFeatured] = useState(FEATURED_ITEMS)
  const [activeTab, setActiveTab] = useState<'coupons' | 'featured'>('coupons')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-heading text-4xl font-semibold text-[#1a1a1a] mb-2">
          Marketing & Promotions
        </h1>
        <p className="text-[#555555]">Manage coupons and featured content</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-4 mb-8 border-b border-[#eaeaea]"
      >
        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-3 font-medium border-b-2 transition ${
            activeTab === 'coupons'
              ? 'border-[#1a1a1a] text-[#1a1a1a]'
              : 'border-transparent text-[#555555] hover:text-[#1a1a1a]'
          }`}
        >
          Promo Codes & Coupons
        </button>
        <button
          onClick={() => setActiveTab('featured')}
          className={`px-4 py-3 font-medium border-b-2 transition ${
            activeTab === 'featured'
              ? 'border-[#1a1a1a] text-[#1a1a1a]'
              : 'border-transparent text-[#555555] hover:text-[#1a1a1a]'
          }`}
        >
          Featured Collections
        </button>
      </motion.div>

      {/* Coupons Section */}
      {activeTab === 'coupons' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Create Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-3 rounded-lg hover:bg-[#333] transition font-medium"
            >
              <Plus size={18} /> Create Coupon
            </motion.button>
          </motion.div>

          {/* Coupons Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {coupons.map((coupon, idx) => (
              <motion.div
                key={coupon.id}
                variants={itemVariants}
                className="bg-white border border-[#eaeaea] rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                {/* Card Header */}
                <div className="p-6 bg-gradient-to-r from-[#1a1a1a] to-[#333] text-white">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-80">
                    {coupon.status}
                  </p>
                  <p className="font-heading text-3xl font-bold tracking-widest">{coupon.code}</p>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#555555] text-sm">Discount</span>
                    <span className="font-semibold text-[#1a1a1a]">
                      {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#555555] text-sm">Min. Spend</span>
                    <span className="font-medium text-[#1a1a1a]">${coupon.minSpend}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#555555] text-sm">Expires</span>
                    <span className="font-medium text-[#1a1a1a]">
                      {new Date(coupon.expiryDate).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Usage */}
                  <div className="pt-4 border-t border-[#eaeaea]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#555555]">Usage</span>
                      <span className="text-xs font-medium text-[#1a1a1a]">
                        {coupon.usedCount} / {coupon.usageLimit}
                      </span>
                    </div>
                    <div className="h-2 bg-[#f3efe9] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(coupon.usedCount / coupon.usageLimit) * 100}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-[#007D48]"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[#f3efe9] text-[#1a1a1a] rounded-lg hover:bg-[#e8dccb] transition text-sm font-medium"
                    >
                      <Copy size={14} /> Copy
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="p-2 border border-[#eaeaea] text-[#555555] rounded-lg hover:bg-[#f3efe9] transition"
                    >
                      <Edit2 size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="p-2 border border-[#eaeaea] text-[#D30005] rounded-lg hover:bg-[#fef2f2] transition"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Featured Collections Section */}
      {activeTab === 'featured' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Create Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-3 rounded-lg hover:bg-[#333] transition font-medium"
            >
              <Plus size={18} /> Add Featured Item
            </motion.button>
          </motion.div>

          {/* Featured Items List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-[#eaeaea] rounded-xl overflow-hidden"
          >
            <div className="divide-y divide-[#eaeaea]">
              {featured.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-6 hover:bg-[#f3efe9] transition flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-[#1a1a1a]">{item.title}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          item.status === 'active'
                            ? 'bg-[#f0fdf4] text-[#166534]'
                            : item.status === 'scheduled'
                              ? 'bg-[#fef3c7] text-[#92400e]'
                              : 'bg-[#f3f4f6] text-[#4b5563]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#555555]">
                      Type: <span className="font-medium">{item.type}</span> • Placement:{' '}
                      <span className="font-medium">{item.placement}</span>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="p-2 hover:bg-[#f3efe9] rounded-lg transition text-[#555555]"
                    >
                      <Eye size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="p-2 hover:bg-[#f3efe9] rounded-lg transition text-[#555555]"
                    >
                      <Edit2 size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="p-2 hover:bg-[#fef2f2] rounded-lg transition text-[#D30005]"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
