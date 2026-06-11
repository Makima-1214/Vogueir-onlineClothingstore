'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  Archive,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
} from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'inactive' | 'archived'
  image: string
  sales: number
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Structured Oversized Jacket',
    category: 'Outerwear',
    price: 890000,
    stock: 15,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=200&auto=format&fit=crop',
    sales: 234,
  },
  {
    id: '2',
    name: 'Wide Leg Cargo Pant',
    category: 'Bottoms',
    price: 650000,
    stock: 25,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&h=200&auto=format&fit=crop',
    sales: 189,
  },
  {
    id: '3',
    name: 'Essential Pullover Hoodie',
    category: 'Tops',
    price: 420000,
    stock: 3,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=200&h=200&auto=format&fit=crop',
    sales: 412,
  },
  {
    id: '4',
    name: 'Canvas Studio Tote',
    category: 'Accessories',
    price: 480000,
    stock: 18,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&auto=format&fit=crop',
    sales: 156,
  },
  {
    id: '5',
    name: 'Relaxed Linen Shirt',
    category: 'Tops',
    price: 540000,
    stock: 0,
    status: 'inactive',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&h=200&auto=format&fit=crop',
    sales: 98,
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(PRODUCTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)

  const categories = ['All', ...new Set(products.map((p) => p.category))]

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#f0fdf4] text-[#166534]'
      case 'inactive':
        return 'bg-[#fef2f2] text-[#991b1b]'
      case 'archived':
        return 'bg-[#f3f4f6] text-[#4b5563]'
      default:
        return 'bg-[#f3efe9] text-[#555555]'
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="font-heading text-4xl font-semibold text-[#1a1a1a] mb-2">
            Products
          </h1>
          <p className="text-[#555555]">Manage your product catalog</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-3 rounded-lg hover:bg-[#333] transition font-medium"
        >
          <Plus size={18} /> Add Product
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 space-y-4 md:space-y-0 md:flex md:gap-4 md:items-center"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#eaeaea] rounded-lg outline-none focus:border-[#1a1a1a] transition"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value)
            setCurrentPage(1)
          }}
          className="px-4 py-2.5 bg-white border border-[#eaeaea] rounded-lg outline-none focus:border-[#1a1a1a] transition text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            setCurrentPage(1)
          }}
          className="px-4 py-2.5 bg-white border border-[#eaeaea] rounded-lg outline-none focus:border-[#1a1a1a] transition text-sm"
        >
          <option value="All">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="archived">Archived</option>
        </select>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#f3efe9] text-[#1a1a1a] rounded-lg hover:bg-[#e8dccb] transition"
        >
          <Download size={16} /> Export
        </motion.button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-[#eaeaea] rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f3efe9] border-b border-[#eaeaea]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#555555]">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#555555]">Category</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-[#555555]">Price</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-[#555555]">Stock</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-[#555555]">Sales</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-[#555555]">Status</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-[#555555]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product, idx) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-[#eaeaea] hover:bg-[#f3efe9] transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div>
                        <p className="font-medium text-[#1a1a1a] text-sm">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#555555]">{product.category}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-[#1a1a1a]">
                    ${(product.price / 1000).toFixed(0)}k
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        product.stock > 10
                          ? 'bg-[#f0fdf4] text-[#166534]'
                          : product.stock > 0
                            ? 'bg-[#fef3c7] text-[#92400e]'
                            : 'bg-[#fef2f2] text-[#991b1b]'
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-[#1a1a1a]">
                    {product.sales}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-[#f3efe9] rounded-lg transition text-[#555555]"
                      >
                        <Edit2 size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-[#f3efe9] rounded-lg transition text-[#555555]"
                      >
                        <Copy size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-[#fef2f2] rounded-lg transition text-[#D30005]"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 flex items-center justify-between"
        >
          <p className="text-sm text-[#555555]">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
          </p>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="flex items-center gap-1 px-3 py-2 border border-[#eaeaea] rounded-lg text-sm font-medium hover:bg-[#f3efe9] disabled:opacity-50 transition"
            >
              <ChevronLeft size={16} /> Previous
            </motion.button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.05 }}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? 'bg-[#1a1a1a] text-white'
                    : 'border border-[#eaeaea] hover:bg-[#f3efe9]'
                }`}
              >
                {page}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="flex items-center gap-1 px-3 py-2 border border-[#eaeaea] rounded-lg text-sm font-medium hover:bg-[#f3efe9] disabled:opacity-50 transition"
            >
              Next <ChevronRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
