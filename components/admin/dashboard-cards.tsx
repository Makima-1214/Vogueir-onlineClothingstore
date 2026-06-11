'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'default' | 'sale' | 'success'
  onClick?: () => void
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'default',
  onClick,
}: StatCardProps) {
  const bgColor = {
    default: 'bg-[#f3efe9]',
    sale: 'bg-red-50',
    success: 'bg-green-50',
  }[color]

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`${bgColor} rounded-xl p-6 cursor-pointer transition`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[#888888] mb-2">{title}</p>
          <p className="font-heading text-3xl font-semibold text-[#1a1a1a] mb-3">{value}</p>
          {subtitle && <p className="text-xs text-[#555555]">{subtitle}</p>}
          {trend && (
            <div className="flex items-center gap-1 mt-2 text-xs font-medium">
              {trend.isPositive ? (
                <TrendingUp size={14} className="text-[#007D48]" />
              ) : (
                <TrendingDown size={14} className="text-[#D30005]" />
              )}
              <span className={trend.isPositive ? 'text-[#007D48]' : 'text-[#D30005]'}>
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-[#888888]">vs last month</span>
            </div>
          )}
        </div>
        <div className="ml-4 p-3 bg-white rounded-lg text-[#1a1a1a]">{icon}</div>
      </div>
    </motion.div>
  )
}

interface OrderStatusCardProps {
  title: string
  statuses: Array<{
    label: string
    count: number
    color: string
  }>
  icon: React.ReactNode
}

export function OrderStatusCard({ title, statuses, icon }: OrderStatusCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-[#eaeaea] rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-lg font-semibold text-[#1a1a1a]">{title}</h3>
        <div className="p-2 bg-[#f3efe9] rounded-lg text-[#1a1a1a]">{icon}</div>
      </div>

      <div className="space-y-3">
        {statuses.map((status, idx) => (
          <motion.div
            key={idx}
            className="flex items-center justify-between p-3 bg-[#f3efe9] rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${status.color}`} />
              <span className="text-sm text-[#555555]">{status.label}</span>
            </div>
            <span className="font-semibold text-[#1a1a1a]">{status.count}</span>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ x: 4 }}
        className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-medium text-[#1a1a1a] hover:bg-[#f3efe9] py-2 rounded-lg transition"
      >
        View Details <ArrowRight size={14} />
      </motion.button>
    </motion.div>
  )
}

interface ChartCardProps {
  title: string
  children: React.ReactNode
  icon: React.ReactNode
}

export function ChartCard({ title, children, icon }: ChartCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-[#eaeaea] rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-lg font-semibold text-[#1a1a1a]">{title}</h3>
        <div className="p-2 bg-[#f3efe9] rounded-lg text-[#1a1a1a]">{icon}</div>
      </div>
      {children}
    </motion.div>
  )
}
