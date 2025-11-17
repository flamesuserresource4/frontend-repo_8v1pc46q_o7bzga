export default function Section({ title, children, actions }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  )
}
