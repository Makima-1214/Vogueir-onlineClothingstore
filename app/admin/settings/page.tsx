'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Lock, LogOut } from 'lucide-react'
import { useSession, signOut } from '@/lib/auth-client'

export default function SettingsPage() {
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '+1 (555) 123-4567',
    company: 'Vogueir Fashion',
    role: 'Admin',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    orderAlerts: true,
    stockAlerts: true,
    weeklyReport: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePreferenceChange = (key: string) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  async function handleSignOut() {
    await signOut()
    window.location.href = '/'
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
          Admin Settings
        </h1>
        <p className="text-[#555555]">Manage your account and preferences</p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-8">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-[#eaeaea] rounded-xl p-6"
        >
          <h2 className="font-heading text-xl font-semibold text-[#1a1a1a] mb-6">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-[#eaeaea] rounded-lg outline-none focus:border-[#1a1a1a] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-[#eaeaea] rounded-lg outline-none focus:border-[#1a1a1a] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-[#eaeaea] rounded-lg outline-none focus:border-[#1a1a1a] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                disabled
                className="w-full px-4 py-2.5 border border-[#eaeaea] rounded-lg bg-[#f3efe9] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                disabled
                className="w-full px-4 py-2.5 border border-[#eaeaea] rounded-lg bg-[#f3efe9] outline-none"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#333] transition font-medium"
          >
            <Save size={18} /> Save Changes
          </motion.button>
        </motion.div>

        {/* Password Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-[#eaeaea] rounded-xl p-6"
        >
          <h2 className="font-heading text-xl font-semibold text-[#1a1a1a] mb-6 flex items-center gap-2">
            <Lock size={20} /> Security Settings
          </h2>

          <div className="space-y-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2.5 border border-[#eaeaea] rounded-lg outline-none focus:border-[#1a1a1a] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2.5 border border-[#eaeaea] rounded-lg outline-none focus:border-[#1a1a1a] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2.5 border border-[#eaeaea] rounded-lg outline-none focus:border-[#1a1a1a] transition"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#333] transition font-medium"
          >
            <Save size={18} /> Update Password
          </motion.button>
        </motion.div>

        {/* Notification Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-[#eaeaea] rounded-xl p-6"
        >
          <h2 className="font-heading text-xl font-semibold text-[#1a1a1a] mb-6">
            Notification Preferences
          </h2>

          <div className="space-y-4 mb-6">
            {Object.entries(preferences).map(([key, value]) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handlePreferenceChange(key)}
                    className="sr-only"
                  />
                  <div
                    className={`w-6 h-6 border-2 rounded-lg transition ${
                      value ? 'bg-[#1a1a1a] border-[#1a1a1a]' : 'border-[#eaeaea]'
                    }`}
                  >
                    {value && (
                      <svg className="w-4 h-4 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-[#1a1a1a] group-hover:text-[#333] transition">
                    {key === 'emailNotifications' && 'Email Notifications'}
                    {key === 'orderAlerts' && 'Order Alerts'}
                    {key === 'stockAlerts' && 'Stock Alerts'}
                    {key === 'weeklyReport' && 'Weekly Report'}
                  </p>
                  <p className="text-sm text-[#555555]">
                    {key === 'emailNotifications' && 'Receive email for all activities'}
                    {key === 'orderAlerts' && 'Get notified about new orders'}
                    {key === 'stockAlerts' && 'Get notified about low stock'}
                    {key === 'weeklyReport' && 'Receive weekly business report'}
                  </p>
                </div>
              </label>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#333] transition font-medium"
          >
            <Save size={18} /> Save Preferences
          </motion.button>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-6"
        >
          <h2 className="font-heading text-xl font-semibold text-[#991b1b] mb-4">Danger Zone</h2>
          <p className="text-sm text-[#7f1d1d] mb-6">
            These actions cannot be undone. Please be careful.
          </p>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#D30005] text-white rounded-lg hover:bg-[#b20004] transition font-medium"
            >
              <LogOut size={18} /> Sign Out
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
