'use client'

import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Plus,
  Edit2,
  RefreshCw,
  TrendingDown,
  Package,
} from 'lucide-react'

interface InventoryItem {
  id: string
  productName: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

const INVENTORY: InventoryItem[] = [
  {
    id: '1',
    productName: 'Structured Oversized Jacket',
    category: 'Outerwear',
    currentStock: 15,
    minStock: 10,
    maxStock: 50,
    status: 'in-stock',
  },
  {
    id: '2',
    productName: 'Wide Leg Cargo Pant',
    category: 'Bottoms',
    currentStock: 25,
    minStock: 15,
    maxStock: 60,
    status: 'in-stock',
  },
  {
    id: '3',
    productName: 'Essential Pullover Hoodie',
    category: 'Tops',
    currentStock: 3,
    minStock: 10,
    maxStock: 40,
    status: 'low-stock',
  },
  {
    id: '4',
    productName: 'Canvas Studio Tote',
    category: 'Accessories',
    currentStock: 18,
    minStock: 8,
    maxStock: 35,
    status: 'in-stock',
  },
  {
    id: '5',
    productName: 'Relaxed Linen Shirt',
    category: 'Tops',
    currentStock: 0,
    minStock: 10,
    maxStock: 40,
    status: 'out-of-stock',
  },
  {
    id: '6',
    productName: 'Urban Runner Mono',
    category: 'Footwear',
    currentStock: 8,
    minStock: 12,
    maxStock: 50,
    status: 'low-stock',
  },
]

export default function InventoryPage() {
  const lowStockItems = INVENTORY.filter((i) => i.status === 'low-stock')
  const outOfStockItems = INVENTORY.filter((i) => i.status === 'out-of-stock')

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

  const getStockPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100)
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
          Inventory Management
        </h1>
        <p className="text-[#555555]">Monitor stock levels and manage reorders</p>
      </motion.div>

      {/* Alerts */}
      {(lowStockItems.length > 0 || outOfStockItems.length > 0) && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {lowStockItems.length > 0 && (
            <motion.div variants={itemVariants} className="bg-[#fef3c7] border border-[#fcd34d] rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#fde68a] rounded-lg">
                  <AlertTriangle className="text-[#92400e]" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-[#92400e] mb-2">
                    Low Stock Alerts ({lowStockItems.length})
                  </h3>
                  <p className="text-sm text-[#78350f] mb-3">
                    These items are running low and should be reordered soon.
                  </p>
                  <div className="space-y-2">
                    {lowStockItems.map((item) => (
                      <p key={item.id} className="text-xs text-[#78350f]">
                        • {item.productName}: {item.currentStock} units left
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {outOfStockItems.length > 0 && (
            <motion.div variants={itemVariants} className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#fca5a5] rounded-lg">
                  <Package className="text-[#991b1b]" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-[#991b1b] mb-2">
                    Out of Stock ({outOfStockItems.length})
                  </h3>
                  <p className="text-sm text-[#7f1d1d] mb-3">
                    These products are completely out of stock.
                  </p>
                  <div className="space-y-2">
                    {outOfStockItems.map((item) => (
                      <p key={item.id} className="text-xs text-[#7f1d1d]">
                        • {item.productName}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Inventory List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-[#eaeaea] rounded-xl overflow-hidden"
      >
        <div className="p-6 border-b border-[#eaeaea] bg-[#f3efe9]">
          <h2 className="font-heading text-lg font-semibold text-[#1a1a1a]">All Products</h2>
        </div>

        <div className="divide-y divide-[#eaeaea]">
          {INVENTORY.map((item, idx) => {
            const stockPercentage = getStockPercentage(item.currentStock, item.maxStock)
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 hover:bg-[#f3efe9] transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-[#888888] uppercase mb-2">Product</p>
                    <p className="font-medium text-[#1a1a1a]">{item.productName}</p>
                    <p className="text-xs text-[#555555] mt-1">{item.category}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#888888] uppercase mb-2">Stock Levels</p>
                    <p className="text-[#1a1a1a] font-semibold">
                      {item.currentStock}{' '}
                      <span className="text-xs font-normal text-[#555555]">
                        / {item.maxStock} units
                      </span>
                    </p>
                    <p className="text-xs text-[#888888] mt-1">Min: {item.minStock} units</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[#888888] uppercase mb-2">Stock Status</p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'in-stock'
                            ? 'bg-[#f0fdf4] text-[#166534]'
                            : item.status === 'low-stock'
                              ? 'bg-[#fef3c7] text-[#92400e]'
                              : 'bg-[#fef2f2] text-[#991b1b]'
                        }`}
                      >
                        {item.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#888888]">Stock Capacity</span>
                    <span className="text-xs font-medium text-[#1a1a1a]">{stockPercentage}%</span>
                  </div>
                  <div className="h-2 bg-[#f3efe9] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stockPercentage}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full ${
                        item.status === 'in-stock'
                          ? 'bg-[#007D48]'
                          : item.status === 'low-stock'
                            ? 'bg-[#f59e0b]'
                            : 'bg-[#D30005]'
                      }`}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#333] transition font-medium text-sm"
                  >
                    <RefreshCw size={14} /> Restock
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 border border-[#eaeaea] text-[#1a1a1a] rounded-lg hover:bg-[#f3efe9] transition font-medium text-sm"
                  >
                    <Edit2 size={14} /> Edit
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Stock Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white border border-[#eaeaea] rounded-xl p-6">
          <p className="text-xs font-semibold text-[#888888] uppercase mb-3">Total Products</p>
          <p className="font-heading text-3xl font-semibold text-[#1a1a1a]">{INVENTORY.length}</p>
          <p className="text-xs text-[#555555] mt-2">Active in inventory</p>
        </div>

        <div className="bg-white border border-[#eaeaea] rounded-xl p-6">
          <p className="text-xs font-semibold text-[#888888] uppercase mb-3">Total Units</p>
          <p className="font-heading text-3xl font-semibold text-[#1a1a1a]">
            {INVENTORY.reduce((sum, item) => sum + item.currentStock, 0)}
          </p>
          <p className="text-xs text-[#555555] mt-2">Currently in stock</p>
        </div>

        <div className="bg-white border border-[#eaeaea] rounded-xl p-6">
          <p className="text-xs font-semibold text-[#888888] uppercase mb-3">Need Attention</p>
          <p className="font-heading text-3xl font-semibold text-[#D30005]">
            {lowStockItems.length + outOfStockItems.length}
          </p>
          <p className="text-xs text-[#555555] mt-2">Low or out of stock</p>
        </div>
      </motion.div>
    </div>
  )
}
