'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Download,
  Eye,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  joinDate: string
  status: 'active' | 'inactive'
  city: string
}

const CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    totalOrders: 8,
    totalSpent: 2450,
    joinDate: '2023-01-15',
    status: 'active',
    city: 'New York, NY',
  },
  {
    id: '2',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '+1 (555) 234-5678',
    totalOrders: 5,
    totalSpent: 1890,
    joinDate: '2023-03-22',
    status: 'active',
    city: 'Los Angeles, CA',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '+1 (555) 345-6789',
    totalOrders: 12,
    totalSpent: 3240,
    joinDate: '2022-11-08',
    status: 'active',
    city: 'San Francisco, CA',
  },
  {
    id: '4',
    name: 'Jessica Brown',
    email: 'jessica@example.com',
    phone: '+1 (555) 456-7890',
    totalOrders: 3,
    totalSpent: 1560,
    joinDate: '2024-02-10',
    status: 'active',
    city: 'Chicago, IL',
  },
  {
    id: '5',
    name: 'David Martinez',
    email: 'david@example.com',
    phone: '+1 (555) 567-8901',
    totalOrders: 1,
    totalSpent: 890,
    joinDate: '2024-05-20',
    status: 'active',
    city: 'Austin, TX',
  },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState(CUSTOMERS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-heading text-4xl font-semibold text-[#1a1a1a] mb-2">Customers</h1>
        <p className="text-[#555555]">Manage and track customer relationships</p>
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
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#eaeaea] rounded-lg outline-none focus:border-[#1a1a1a] transition"
          />
        </div>

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
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#555555]">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#555555]">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#555555]">Location</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-[#555555]">Orders</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-[#555555]">Lifetime Value</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-[#555555]">Status</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-[#555555]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((customer, idx) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-[#eaeaea] hover:bg-[#f3efe9] transition"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#1a1a1a] text-sm">{customer.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#555555]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-[#888888]" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-[#888888]" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#555555]">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#888888]" />
                      {customer.city}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-[#1a1a1a] text-sm">
                    {customer.totalOrders}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-[#1a1a1a] text-sm">
                    ${customer.totalSpent}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-[#f0fdf4] text-[#166534] rounded-full text-xs font-medium">
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setSelectedCustomer(customer)}
                      className="p-2 hover:bg-[#f3efe9] rounded-lg transition text-[#555555]"
                    >
                      <Eye size={16} />
                    </motion.button>
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
            {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of{' '}
            {filteredCustomers.length}
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

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCustomer(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-heading text-2xl font-semibold text-[#1a1a1a] mb-6">
              Customer Profile
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-[#888888] uppercase mb-2">Name</p>
                <p className="text-[#1a1a1a] font-medium">{selectedCustomer.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#888888] uppercase mb-2">Email</p>
                <p className="text-[#1a1a1a]">{selectedCustomer.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#888888] uppercase mb-2">Phone</p>
                <p className="text-[#1a1a1a]">{selectedCustomer.phone}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#888888] uppercase mb-2">Location</p>
                <p className="text-[#1a1a1a]">{selectedCustomer.city}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#888888] uppercase mb-2">Total Orders</p>
                <p className="text-[#1a1a1a] font-semibold text-lg">{selectedCustomer.totalOrders}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#888888] uppercase mb-2">Lifetime Value</p>
                <p className="text-[#1a1a1a] font-semibold text-lg">${selectedCustomer.totalSpent}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#888888] uppercase mb-2">Join Date</p>
                <p className="text-[#1a1a1a]">
                  {new Date(selectedCustomer.joinDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#888888] uppercase mb-2">Status</p>
                <span className="px-3 py-1 bg-[#f0fdf4] text-[#166534] rounded-full text-xs font-medium">
                  {selectedCustomer.status}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex-1 px-4 py-2.5 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#333] transition font-medium"
              >
                Send Message
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedCustomer(null)}
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
