'use client'

import { motion } from 'framer-motion'
import {
  Bell,
  Package,
  AlertTriangle,
  Users,
  Zap,
  Trash2,
  CheckCircle,
} from 'lucide-react'
import { useNotifications } from '@/components/admin/notifications-context'

export default function NotificationsPage() {
  const { notifications, markAsRead } = useNotifications()

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package size={20} className="text-blue-500" />
      case 'stock':
        return <AlertTriangle size={20} className="text-[#D30005]" />
      case 'customer':
        return <Users size={20} className="text-purple-500" />
      case 'system':
        return <Zap size={20} className="text-yellow-500" />
      default:
        return <Bell size={20} />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-50 border-blue-200'
      case 'stock':
        return 'bg-red-50 border-red-200'
      case 'customer':
        return 'bg-purple-50 border-purple-200'
      case 'system':
        return 'bg-yellow-50 border-yellow-200'
      default:
        return 'bg-[#f3efe9] border-[#e8dccb]'
    }
  }

  const groupedNotifications = {
    unread: notifications.filter((n) => !n.read),
    read: notifications.filter((n) => n.read),
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-heading text-4xl font-semibold text-[#1a1a1a] mb-2">
          Notifications
        </h1>
        <p className="text-[#555555]">Stay updated with important alerts</p>
      </motion.div>

      {/* Unread Notifications */}
      {groupedNotifications.unread.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="font-heading text-lg font-semibold text-[#1a1a1a] mb-4">New</h2>
          <div className="space-y-3">
            {groupedNotifications.unread.map((notif, idx) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`border-l-4 border-[#1a1a1a] rounded-lg p-4 flex items-start gap-4 ${getNotificationColor(notif.type)}`}
              >
                <div className="flex-shrink-0 mt-1">{getNotificationIcon(notif.type)}</div>
                <div className="flex-1">
                  <p className="font-semibold text-[#1a1a1a] mb-1">{notif.title}</p>
                  <p className="text-sm text-[#555555]">{notif.message}</p>
                  <p className="text-xs text-[#888888] mt-2">
                    {notif.timestamp.toLocaleDateString()} at{' '}
                    {notif.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => markAsRead(notif.id)}
                    className="p-2 hover:bg-white rounded-lg transition text-[#555555]"
                    title="Mark as read"
                  >
                    <CheckCircle size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="p-2 hover:bg-white rounded-lg transition text-[#888888]"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Read Notifications */}
      {groupedNotifications.read.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-heading text-lg font-semibold text-[#1a1a1a] mb-4">Earlier</h2>
          <div className="space-y-3">
            {groupedNotifications.read.map((notif, idx) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.02 }}
                className="bg-[#f3efe9] border border-[#eaeaea] rounded-lg p-4 flex items-start gap-4 opacity-75 hover:opacity-100 transition"
              >
                <div className="flex-shrink-0 mt-1 text-[#888888]">
                  {getNotificationIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#1a1a1a] mb-1">{notif.title}</p>
                  <p className="text-sm text-[#555555]">{notif.message}</p>
                  <p className="text-xs text-[#888888] mt-2">
                    {notif.timestamp.toLocaleDateString()} at{' '}
                    {notif.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 hover:bg-white rounded-lg transition text-[#888888]"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {notifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-[#f3efe9] rounded-xl border border-[#eaeaea]"
        >
          <Bell size={48} className="mx-auto text-[#888888] mb-4" />
          <p className="text-[#555555] font-medium mb-2">No notifications yet</p>
          <p className="text-sm text-[#888888]">
            You'll see important updates here when they happen
          </p>
        </motion.div>
      )}
    </div>
  )
}
