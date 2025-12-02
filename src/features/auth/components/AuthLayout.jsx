export default function AuthLayout({ title, children, footer }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-sm">
        <form className="bg-gray-800/90 backdrop-blur-sm px-6 py-7 rounded-lg shadow-lg space-y-4">
          <h2 className="text-white text-2xl font-bold mb-1 text-center">
            {title}
          </h2>
          <div className="space-y-3">{children}</div>
          {footer && (
            <div className="text-gray-400 text-sm mt-3 text-center">
              {footer}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
