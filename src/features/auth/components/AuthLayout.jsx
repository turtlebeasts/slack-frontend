export default function AuthLayout({ title, children, footer }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form className="bg-gray-800 p-6 rounded w-80 space-y-3">
        <h2 className="text-white text-xl font-bold mb-2">{title}</h2>
        {children}
        {footer && <div className="text-gray-400 text-sm mt-2">{footer}</div>}
      </form>
    </div>
  );
}
