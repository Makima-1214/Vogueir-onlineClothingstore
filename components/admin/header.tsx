'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, User, LogOut, Settings, Search } from 'lucide-react'
import { useSession, signOut } from '@/lib/auth-client'
import { useNotifications } from '@/components/admin/notifications-context'

export function AdminHeader() {
  const { data: session } = useSession()
  const { notifications } = useNotifications()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleSignOut() {
    await signOut()
    window.location.href = '/'
  }

  return (
    <header className="bg-white border-b border-[#eaeaea] sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 bg-[#f3efe9] px-4 py-2 rounded-lg flex-1 max-w-md">
          <Search size={18} className="text-[#888888]" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-[#1a1a1a] placeholder-[#888888] outline-none flex-1"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 hover:bg-[#f3efe9] rounded-lg transition"
          >
            <Bell size={20} className="text-[#1a1a1a]" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-[#D30005] text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </motion.button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-16 right-6 w-80 bg-white border border-[#eaeaea] rounded-lg shadow-lg p-4"
              >
                <h3 className="font-heading text-[#1a1a1a] font-semibold mb-3">Notifications</h3>
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {notifications.slice(0, 5).map((notif) => (
                    <motion.div
                      key={notif.id}
                      className={`p-3 rounded-lg ${
                        notif.read ? 'bg-[#f3efe9]' : 'bg-[#e8dccb]'
                      } text-sm`}
                    >
                      <p className="font-medium text-[#1a1a1a]">{notif.title}</p>
                      <p className="text-[#555555] text-xs mt-1">{notif.message}</p>
                    </motion.div>
                  ))}
                </div>
                <Link
                  href="/admin/notifications"
                  className="block mt-3 text-center text-sm text-[#1a1a1a] font-medium hover:underline"
                >
                  View All Notifications
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-[#f3efe9] rounded-lg transition"
            >
              <div className="w-8 h-8 bg-[#e8dccb] rounded-full flex items-center justify-center text-[#1a1a1a] font-semibold text-sm">
                {session?.user?.name?.[0]?.toUpperCase() || 'A'}
              </div>
            </motion.button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-12 right-0 w-48 bg-white border border-[#eaeaea] rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-4 border-b border-[#eaeaea]">
                    <p className="text-sm font-semibold text-[#1a1a1a]">{session?.user?.name}</p>
                    <p className="text-xs text-[#888888]">{session?.user?.email}</p>
                  </div>
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-2 px-4 py-3 text-sm text-[#555555] hover:bg-[#f3efe9] transition"
                  >
                    <Settings size={16} />
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-[#D30005] hover:bg-[#ffe6e6] transition text-left"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
