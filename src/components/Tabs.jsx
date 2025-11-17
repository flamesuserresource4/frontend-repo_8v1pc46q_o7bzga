import { useState } from 'react'

export default function Tabs({ tabs, onChange }) {
  const [active, setActive] = useState(tabs[0].key)

  const handleClick = (key) => {
    setActive(key)
    onChange?.(key)
  }

  return (
    <div className="w-full border-b border-gray-200">
      <nav className="-mb-px flex flex-wrap gap-2" aria-label="Tabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => handleClick(t.key)}
            className={`whitespace-nowrap rounded-t px-4 py-2 text-sm font-medium transition-colors ${
              active === t.key
                ? 'bg-white border-x border-t border-gray-200 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
