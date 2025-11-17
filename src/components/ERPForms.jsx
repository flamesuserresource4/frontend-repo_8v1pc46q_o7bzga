import { useEffect, useMemo, useState } from 'react'

const apiBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Text({ label, value, onChange, type = 'text', required, step }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-gray-700">{label}</span>
      <input
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        step={step}
        required={required}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  )
}

function Number({ label, value, onChange, step = '0.01' }) {
  return <Text label={label} value={value} onChange={(v) => onChange(parseFloat(v || 0))} type="number" step={step} />
}

export function Items() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({ name: '', sku: '', unit: 'pcs', sale_price: 0 })
  const load = async () => {
    const r = await fetch(`${apiBase}/items`)
    setList(await r.json())
  }
  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    await fetch(`${apiBase}/items`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ name: '', sku: '', unit: 'pcs', sale_price: 0 })
    load()
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
        <Text label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <Text label="SKU" value={form.sku} onChange={(v) => setForm({ ...form, sku: v })} required />
        <Text label="Unit" value={form.unit} onChange={(v) => setForm({ ...form, unit: v })} />
        <Number label="Sale Price" value={form.sale_price} onChange={(v) => setForm({ ...form, sale_price: v })} />
        <button className="sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2">Add Item</button>
      </form>

      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">SKU</th>
              <th className="py-2 pr-4">Unit</th>
              <th className="py-2 pr-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {list.map((it) => (
              <tr key={it._id} className="border-t">
                <td className="py-2 pr-4">{it.name}</td>
                <td className="py-2 pr-4">{it.sku}</td>
                <td className="py-2 pr-4">{it.unit}</td>
                <td className="py-2 pr-4">{it.sale_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function Vendors() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({ name: '', phone: '' })
  const load = async () => {
    const r = await fetch(`${apiBase}/vendors`)
    setList(await r.json())
  }
  useEffect(() => { load() }, [])
  const submit = async (e) => {
    e.preventDefault()
    await fetch(`${apiBase}/vendors`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ name: '', phone: '' })
    load()
  }
  return (
    <div className="grid gap-6">
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
        <Text label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <Text label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <button className="sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2">Add Vendor</button>
      </form>
      <ul className="divide-y">
        {list.map((v) => (
          <li key={v._id} className="py-2 flex justify-between">
            <span>{v.name}</span>
            <span className="text-gray-500">{v.phone}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Customers() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({ name: '', phone: '' })
  const load = async () => {
    const r = await fetch(`${apiBase}/customers`)
    setList(await r.json())
  }
  useEffect(() => { load() }, [])
  const submit = async (e) => {
    e.preventDefault()
    await fetch(`${apiBase}/customers`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ name: '', phone: '' })
    load()
  }
  return (
    <div className="grid gap-6">
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
        <Text label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <Text label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <button className="sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2">Add Customer</button>
      </form>
      <ul className="divide-y">
        {list.map((v) => (
          <li key={v._id} className="py-2 flex justify-between">
            <span>{v.name}</span>
            <span className="text-gray-500">{v.phone}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Stock() {
  const [rows, setRows] = useState([])
  const load = async () => {
    const r = await fetch(`${apiBase}/stock`)
    setRows(await r.json())
  }
  useEffect(() => { load() }, [])

  return (
    <div className="overflow-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="py-2 pr-4">Item</th>
            <th className="py-2 pr-4">SKU</th>
            <th className="py-2 pr-4">On Hand</th>
            <th className="py-2 pr-4">Unit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.item_id} className="border-t">
              <td className="py-2 pr-4">{r.name}</td>
              <td className="py-2 pr-4">{r.sku}</td>
              <td className="py-2 pr-4">{r.on_hand}</td>
              <td className="py-2 pr-4">{r.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
