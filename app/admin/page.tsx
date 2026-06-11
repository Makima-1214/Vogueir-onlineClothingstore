'use client'

import { motion } from 'framer-motion'
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  BarChart3,
} from 'lucide-react'
import { StatCard, OrderStatusCard, ChartCard } from '@/components/admin/dashboard-cards'
import { BarChart, LineChart, PieChart } from '@/components/admin/chart-component'

export default function AdminDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
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
          Dashboard
        </h1>
        <p className="text-[#555555]">Welcome back! Here's your business overview.</p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <motion.div variants={itemVariants}>
          <StatCard
            title="Today's Revenue"
            value="$12,450"
            subtitle="5 orders completed"
            icon={<DollarSign size={24} />}
            trend={{ value: 12, isPositive: true }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="This Week"
            value="$84,200"
            subtitle="42 orders total"
            icon={<TrendingUp size={24} />}
            trend={{ value: 8, isPositive: true }}
            color="success"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="This Month"
            value="$342,890"
            subtitle="156 orders total"
            icon={<DollarSign size={24} />}
            trend={{ value: 24, isPositive: true }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Customers"
            value="2,438"
            subtitle="324 new this month"
            icon={<Users size={24} />}
            trend={{ value: 18, isPositive: true }}
          />
        </motion.div>
      </motion.div>

      {/* Orders & Inventory */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        <motion.div variants={itemVariants}>
          <OrderStatusCard
            title="Order Status"
            icon={<ShoppingCart size={20} />}
            statuses={[
              { label: 'New Orders', count: 12, color: 'bg-blue-500' },
              { label: 'Processing', count: 28, color: 'bg-yellow-500' },
              { label: 'Completed', count: 156, color: 'bg-[#007D48]' },
              { label: 'Cancelled', count: 3, color: 'bg-[#D30005]' },
            ]}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <OrderStatusCard
            title="Product Status"
            icon={<Package size={20} />}
            statuses={[
              { label: 'Total Products', count: 324, color: 'bg-[#1a1a1a]' },
              { label: 'Active', count: 298, color: 'bg-[#007D48]' },
              { label: 'Out of Stock', count: 18, color: 'bg-[#D30005]' },
              { label: 'Archived', count: 8, color: 'bg-[#888888]' },
            ]}
          />
        </motion.div>
      </motion.div>

      {/* Analytics Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        <motion.div variants={itemVariants}>
          <ChartCard title="Weekly Sales" icon={<BarChart3 size={20} />}>
            <BarChart
              data={[
                { label: 'Mon', value: 4200 },
                { label: 'Tue', value: 5800 },
                { label: 'Wed', value: 6200 },
                { label: 'Thu', value: 7100 },
                { label: 'Fri', value: 8900 },
                { label: 'Sat', value: 12400 },
                { label: 'Sun', value: 6800 },
              ]}
            />
          </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ChartCard title="Revenue Growth (Last 6 Months)" icon={<TrendingUp size={20} />}>
            <LineChart
              data={[
                { label: 'Jan', value: 28000 },
                { label: 'Feb', value: 35000 },
                { label: 'Mar', value: 42000 },
                { label: 'Apr', value: 58000 },
                { label: 'May', value: 72000 },
                { label: 'Jun', value: 95000 },
              ]}
            />
          </ChartCard>
        </motion.div>
      </motion.div>

      {/* Product & Customer Analysis */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div variants={itemVariants}>
          <ChartCard title="Top Product Categories" icon={<Package size={20} />}>
            <PieChart
              data={[
                { label: 'Tops', value: 45, color: '#1a1a1a' },
                { label: 'Bottoms', value: 28, color: '#e8dccb' },
                { label: 'Outerwear', value: 18, color: '#888888' },
                { label: 'Accessories', value: 9, color: '#D30005' },
              ]}
            />
          </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ChartCard title="Customer Growth" icon={<Users size={20} />}>
            <BarChart
              data={[
                { label: 'Returning', value: 1824, maxValue: 2000 },
                { label: 'New', value: 614, maxValue: 2000 },
              ]}
            />
            <div className="mt-6 p-4 bg-[#f3efe9] rounded-lg space-y-2">
              <p className="text-sm text-[#555555]">Customer Insights</p>
              <p className="text-xs text-[#888888]">
                ✓ Retention rate: 75% • Average order value: $145
              </p>
            </div>
          </ChartCard>
        </motion.div>
      </motion.div>
    </div>
  )
}
