import { useMemo, useState } from 'react'
import Tabs from './components/Tabs'
import Section from './components/Section'
import { Items, Vendors, Customers, Stock } from './components/ERPForms'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const tabs = useMemo(() => ([
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'items', label: 'Items' },
    { key: 'vendors', label: 'Vendors' },
    { key: 'customers', label: 'Customers' },
    { key: 'stock', label: 'Stock' },
  ]), [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Hardware Shop ERP</h1>
          <a href="/test" className="text-sm text-blue-600 hover:underline">Check Backend</a>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Tabs tabs={tabs} onChange={setActiveTab} />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 grid gap-6">
        {activeTab === 'dashboard' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Items', 'Vendors', 'Customers', 'Stock'].map((t) => (
              <div key={t} className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                <p className="text-gray-500 text-sm">Quick Stat</p>
                <p className="text-2xl font-semibold text-gray-800 mt-2">{t}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'items' && (
          <Section title="Items">
            <Items />
          </Section>
        )}

        {activeTab === 'vendors' && (
          <Section title="Vendors">
            <Vendors />
          </Section>
        )}

        {activeTab === 'customers' && (
          <Section title="Customers">
            <Customers />
          </Section>
        )}

        {activeTab === 'stock' && (
          <Section title="Stock On Hand">
            <Stock />
          </Section>
        )}
      </main>
    </div>
  )
}

export default App
