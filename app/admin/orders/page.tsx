'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Download,
  Eye,
  MessageCircle,
  CheckCircle,
  Clock,
  Truck,
  Package,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface Order {
  id: string
  orderId: string
  customer: string
  date: string
  total: number
  items: number
  paymentStatus: 'paid' | 'pending' | 'failed'
  shippingStatus: 'pending' | 'processing' | 'shipped' | 'delivered'
}

const ORDERS: Order[] = [
  {
    id: '1',
    orderId: '#ORD-12345',
    customer: 'Sarah Johnson',
    date: '2024-06-10',
    total: 2450,
    items: 3,
    paymentStatus: 'paid',
    shippingStatus: 'delivered',
  },
  {
    id: '2',
    orderId: '#ORD-12344',
    customer: 'Emma Wilson',
    date: '2024-06-09',
    total: 1890,
    items: 2,
    paymentStatus: 'paid',
    shippingStatus: 'shipped',
  },
  {
    id: '3',
    orderId: '#ORD-12343',
    customer: 'Michael Chen',
    date: '2024-06-09',
    total: 3240,
    items: 4,
    paymentStatus: 'pending',
    shippingStatus: 'processing',
  },
  {
    id: '4',
    orderId: '#ORD-12342',
    customer: 'Jessica Brown',
    date: '2024-06-08',
    total: 1560,
    items: 2,
    paymentStatus: 'paid',
    shippingStatus: 'pending',
  },
  {
    id: '5',
    orderId: '#ORD-12341',
    customer: 'David Martinez',
    date: '2024-06-08',
    total: 890,
    items: 1,
    paymentStatus: 'failed',
    shippingStatus: 'pending',
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(ORDERS)
  const [searchTerm, setSearchTerm] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('All')
  const [shippingFilter, setShippingFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPayment = paymentFilter === 'All' || o.paymentStatus === paymentFilter
    const matchesShipping = shippingFilter === 'All' || o.shippingStatus === shippingFilter
    return matchesSearch && matchesPayment && matchesShipping
  })

  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-[#f0fdf4] text-[#166534]'
      case 'pending':
        return 'bg-[#fef3c7] text-[#92400e]'
      case 'failed':
        return 'bg-[#fef2f2] text-[#991b1b]'
      default:
        return 'bg-[#f3efe9] text-[#555555]'
    }
  }

  const getShippingIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />
      case 'processing':
        return <Package size={16} />
      case 'shipped':
        return <Truck size={16} />
      case 'delivered':
        return <CheckCircle size={16} />
      default:
        return null
    }
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-heading text-4xl font-semibold text-[#1a1a1a] mb-2">Orders</h1>
        <p className="text-[#555555]">Manage and track customer orders</p>
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
            placeholder="Search by order ID or customer..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#eaeaea] rounded-lg outline-none focus:border-[#1a1a1a] transition"
          />
        </div>

        <select
          value={paymentFilter}
          onChange={(e) => {
            setPaymentFilter(e.target.value)
            setCurrentPage(1)
          }}
          className="px-4 py-2.5 bg-white border border-[#eaeaea] rounded-lg outline-none focus:border-[#1a1a1a] transition text-sm"
        >
          <option value="All">All Payment Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>

        <select
          value={shippingFilter}
          onChange={(e) => {
            setShippingFilter(e.target.value)
            setCurrentPage(1)
          }}
          className="px-4 py-2.5 bg-white border border-[#eaeaea] rounded-lg outline-none focus:border-[#1a1a1a] transition text-sm"
        >
          <option value="All">All Shipping Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
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
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#555555]">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#555555]">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#555555]">Date</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-[#555555]">Total</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-[#555555]">Payment</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-[#555555]">Shipping</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-[#555555]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order, idx) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-[#eaeaea] hover:bg-[#f3efe9] transition"
                >
                  <td className="px-6 py-4 font-medium text-[#1a1a1a] text-sm">{order.orderId}</td>
                  <td className="px-6 py-4 text-sm text-[#555555]">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-[#555555]">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-[#1a1a1a] text-sm">
                    ${order.total}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[#555555]">{getShippingIcon(order.shippingStatus)}</span>
                      <span className="text-xs font-medium text-[#555555]">{order.shippingStatus}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 hover:bg-[#f3efe9] rounded-lg transition text-[#555555]"
                      >
                        <Eye size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="p-2 hover:bg-[#f3efe9] rounded-lg transition text-[#555555]"
                      >
                        <MessageCircle size={16} />
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
            {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length}
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

      {/* Order Detail Modal */}
      {selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-2xl font-semibold text-[#1a1a1a]">
                Order Details
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-[#f3efe9] rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#888888] uppercase mb-1">Order ID</p>
                  <p className="text-[#1a1a1a] font-medium">{selectedOrder.orderId}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#888888] uppercase mb-1">Customer</p>
                  <p className="text-[#1a1a1a] font-medium">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#888888] uppercase mb-1">Order Date</p>
                  <p className="text-[#1a1a1a]">{formatDate(selectedOrder.date)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#888888] uppercase mb-1">Total</p>
                  <p className="text-[#1a1a1a] font-semibold text-lg">${selectedOrder.total}</p>
                </div>
              </div>

              <div className="border-t border-[#eaeaea] pt-4 space-y-3">
                <p className="text-xs font-semibold text-[#888888] uppercase">Status</p>
                <div className="flex gap-4">
                  <div>
                    <p className="text-xs text-[#555555] mb-1">Payment</p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentColor(
                        selectedOrder.paymentStatus
                      )}`}
                    >
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-[#555555] mb-1">Shipping</p>
                    <span className="px-3 py-1 bg-[#f3efe9] text-[#555555] rounded-full text-xs font-medium">
                      {selectedOrder.shippingStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex-1 px-4 py-2.5 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#333] transition font-medium"
              >
                Update Status
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedOrder(null)}
                className="flex-1 px-4 py-2.5 border border-[#eaeaea] text-[#1a1a1a] rounded-lg hover:bg-[#f3efe9] transition font-medium"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
