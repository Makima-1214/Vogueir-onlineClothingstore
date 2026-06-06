'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const FOOTER_DATA = [
  { title: 'Company', links: ['About Vogueir', 'Careers', 'Press', 'Sustainability'] },
  { title: 'Help', links: ['FAQ', 'Returns', 'Size Guide', 'Track Order'] },
  { title: 'Shop', links: ['New Arrivals', 'Women', 'Men', 'Sale'] },
  { title: 'Follow', links: ['Instagram', 'TikTok', 'Pinterest'] },
]

export function PageFooter() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  return (
    <footer style={{ borderTop: '1px solid #E8E8E8', backgroundColor: '#faf9f8' }} className="pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-8 border-b md:border-b-0 border-gray-200">
          {FOOTER_DATA.map((col) => (
            <div key={col.title} className="border-b md:border-b-0 border-gray-100 last:border-0">
              {/* Mobile Toggle */}
              <button 
                onClick={() => toggleSection(col.title)}
                className="w-full flex md:hidden items-center justify-between py-5 text-[11px] font-semibold uppercase tracking-[2px] text-[#1a1a1a]"
              >
                {col.title}
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ${openSections[col.title] ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Desktop Header */}
              <h3 className="hidden md:block text-[11px] font-semibold uppercase tracking-[2px] mb-6 text-[#1a1a1a]">
                {col.title}
              </h3>

              {/* Content List */}
              <ul className={`overflow-hidden transition-all duration-300 md:h-auto md:opacity-100 space-y-3 pb-5 md:pb-0 ${
                openSections[col.title] ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 md:max-h-none'
              }`}>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[13px] text-[#707072] hover:text-[#1a1a1a] transition-colors block md:inline-block">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold tracking-[4px] uppercase">
              VOGUEIR
            </Link>
            <span className="text-[11px] text-[#9E9EA0] tracking-wider text-center md:text-left">© 2024 Vogueir Fashion. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-[10px] text-[#707072] uppercase tracking-widest font-medium">
            <span className="cursor-pointer hover:text-[#1a1a1a] transition">Privacy</span>
            <span className="cursor-pointer hover:text-[#1a1a1a] transition">Terms</span>
            <span className="cursor-pointer hover:text-[#1a1a1a] transition">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
