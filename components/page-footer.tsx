import Link from 'next/link'

export function PageFooter() {
  return (
    <footer style={{ borderTop: '1px solid #E8E8E8', backgroundColor: '#faf9f8' }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-8 py-10">
        {[
          { title: 'Company', links: ['About Vogueir', 'Careers', 'Press', 'Sustainability'] },
          { title: 'Help', links: ['FAQ', 'Returns', 'Size Guide', 'Track Order'] },
          { title: 'Shop', links: ['New Arrivals', 'Women', 'Men', 'Sale'] },
          { title: 'Follow', links: ['Instagram', 'TikTok', 'Pinterest'] },
        ].map((col) => (
          <div key={col.title}>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest mb-3">{col.title}</h3>
            <ul className="space-y-1.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-[12px] text-[#707072] hover:text-[#1a1a1a] transition block">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className="flex flex-col md:flex-row justify-between items-center gap-2 px-6 md:px-8 py-5"
        style={{ borderTop: '1px solid #E8E8E8' }}
      >
        <div className="flex flex-col items-start md:items-center md:flex-row gap-1">
          <Link
            href="/"
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-base font-semibold tracking-[3px] uppercase"
          >
            VOGUEIR
          </Link>
          <span className="hidden md:inline text-[#9E9EA0] mx-2">·</span>
          <span className="text-[11px] text-[#9E9EA0] tracking-wider">© 2024 Vogueir Fashion. All rights reserved.</span>
        </div>
        <span className="text-[11px] text-[#9E9EA0] tracking-wider">Privacy · Terms · Cookies</span>
      </div>
    </footer>
  )
}
