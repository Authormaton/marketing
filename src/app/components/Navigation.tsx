export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-950/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Authormaton
          </span>
        </div>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Features
          </a>
          <a
            href="#contact"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Contact
          </a>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition-colors">
          Request Demo
        </button>
      </div>
    </nav>
  );
}
