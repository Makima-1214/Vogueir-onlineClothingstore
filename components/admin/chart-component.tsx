'use client'

import { motion } from 'framer-motion'

interface DataPoint {
  label: string
  value: number
  maxValue?: number
}

export function BarChart({ data }: { data: DataPoint[] }) {
  const maxValue = Math.max(
    ...data.map((d) => d.maxValue || Math.max(...data.map((item) => item.value)))
  )

  return (
    <div className="space-y-4">
      {data.map((item, idx) => (
        <motion.div key={idx} className="flex items-center gap-4">
          <span className="text-xs font-medium text-[#555555] w-16">{item.label}</span>
          <div className="flex-1 h-8 bg-[#f3efe9] rounded-lg overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / maxValue) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-[#1a1a1a] rounded-lg"
            />
          </div>
          <span className="text-sm font-semibold text-[#1a1a1a] w-12 text-right">
            {item.value}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

export function LineChart({ data }: { data: DataPoint[] }) {
  const maxValue = Math.max(...data.map((d) => d.value))
  const points = data.map((d) => (d.value / maxValue) * 100)
  const pathData = points
    .map((p, i) => `${(i / (points.length - 1)) * 100},${100 - p}`)
    .join(' L ')

  return (
    <div className="h-64 flex items-end justify-between gap-2">
      {data.map((item, idx) => (
        <motion.div
          key={idx}
          className="flex flex-col items-center flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: idx * 0.05 }}
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(item.value / maxValue) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.05 }}
            className="w-full bg-gradient-to-t from-[#1a1a1a] to-[#555555] rounded-t-lg"
          />
          <span className="text-xs text-[#555555] mt-2">{item.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

export function PieChart({
  data,
}: {
  data: Array<{ label: string; value: number; color: string }>
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  return (
    <div className="flex items-center justify-center">
      <svg className="w-48 h-48" viewBox="0 0 200 200">
        {data.map((item, idx) => {
          const sliceAngle = (item.value / total) * 360
          const startAngle = currentAngle
          const endAngle = currentAngle + sliceAngle
          currentAngle = endAngle

          const startRad = (startAngle * Math.PI) / 180
          const endRad = (endAngle * Math.PI) / 180
          const radius = 80

          const x1 = 100 + radius * Math.cos(startRad)
          const y1 = 100 + radius * Math.sin(startRad)
          const x2 = 100 + radius * Math.cos(endRad)
          const y2 = 100 + radius * Math.sin(endRad)

          const largeArc = sliceAngle > 180 ? 1 : 0

          const pathData = [
            `M 100 100`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
            'Z',
          ].join(' ')

          return (
            <motion.path
              key={idx}
              d={pathData}
              fill={item.color}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
            />
          )
        })}
      </svg>
      <div className="ml-4 space-y-2">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-[#555555]">{item.label}</span>
            <span className="text-xs font-semibold text-[#1a1a1a]">
              {((item.value / total) * 100).toFixed(0)}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
