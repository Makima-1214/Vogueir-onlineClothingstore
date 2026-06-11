'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'order' | 'stock' | 'customer' | 'system'
  read: boolean
  timestamp: Date
}

interface NotificationsContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  clearNotifications: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Order #12345',
      message: 'Order placed by Sarah Johnson',
      type: 'order',
      read: false,
      timestamp: new Date(),
    },
    {
      id: '2',
      title: 'Low Stock Alert',
      message: 'Oversized Jacket - Only 3 units left',
      type: 'stock',
      read: false,
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '3',
      title: 'New Customer',
      message: 'Welcome to Emma Watson',
      type: 'customer',
      read: true,
      timestamp: new Date(Date.now() - 7200000),
    },
  ])

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    setNotifications((prev) => [
      {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
      },
      ...prev,
    ])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    )
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, markAsRead, clearNotifications }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationsProvider')
  }
  return context
}
