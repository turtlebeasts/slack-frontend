export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-gray-950/50 border-b border-gray-800">
        <h1 className="text-2xl font-semibold">ChatFlow</h1>
        <div className="space-x-4">
          <a
            href="/login"
            className="px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-600 transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Sign Up
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Team Chat Made Simple
        </h2>
        <p className="text-gray-400 max-w-2xl mb-8 text-lg">
          Collaborate with your team in real-time, stay connected, and boost
          productivity with clean and effortless communication.
        </p>

        <a
          href="/login"
          className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-lg"
        >
          Start Chatting
        </a>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-gray-800 text-gray-500 text-sm">
        © {new Date().getFullYear()} ChatFlow. All rights reserved.
      </footer>
    </div>
  );
}
