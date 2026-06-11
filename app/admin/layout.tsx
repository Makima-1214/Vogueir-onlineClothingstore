'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AdminSidebar } from '@/components/admin/sidebar'
import { AdminHeader } from '@/components/admin/header'
import { NotificationsProvider } from '@/components/admin/notifications-context'

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <NotificationsProvider>
      <div className="flex h-screen overflow-hidden bg-[#faf9f8]">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto flex flex-col">
          <AdminHeader />
          <main className="flex-1 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 sm:p-6 md:p-8"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </NotificationsProvider>
  )
}
