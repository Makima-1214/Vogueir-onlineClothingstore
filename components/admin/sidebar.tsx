'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Warehouse,
  Tag,
  Bell,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Inventory', href: '/admin/inventory', icon: Warehouse },
  { label: 'Marketing', href: '/admin/marketing', icon: Tag },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed md:hidden bottom-20 right-6 z-40 p-3 bg-[#1a1a1a] text-white rounded-full shadow-lg hover:bg-[#333] transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={isMobile ? { x: -280 } : false}
        animate={isMobile ? { x: isOpen ? 0 : -280 } : { x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-64 bg-[#faf9f8] border-r border-[#eaeaea] flex flex-col fixed md:static h-screen z-40 md:z-0"
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#eaeaea]">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-white font-bold">
              V
            </div>
            <div>
              <h1 className="font-heading text-[#1a1a1a] text-lg font-semibold">Vogueir</h1>
              <p className="text-xs text-[#888888]">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      active
                        ? 'bg-[#1a1a1a] text-white'
                        : 'text-[#555555] hover:bg-[#f3efe9]'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                    {active && <ChevronRight size={16} />}
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#eaeaea] space-y-2 text-xs text-[#888888]">
          <p>© 2026 Vogueir</p>
          <p>Admin Dashboard v1.0</p>
        </div>
      </motion.aside>
    </>
  )
}
