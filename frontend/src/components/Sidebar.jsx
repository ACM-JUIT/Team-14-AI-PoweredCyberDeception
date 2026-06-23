function Sidebar() {
  return (
    <aside className="bg-brand-dark text-white w-16 sm:w-64 min-h-screen p-3 sm:p-6">
      <h2 className="text-sm sm:text-xl font-bold mb-8 hidden sm:block">PhantomShield</h2>
      <nav className="flex flex-col gap-4">
        <a href="#" className="hover:text-brand transition text-xs sm:text-base">
          <span className="sm:hidden">🏠</span>
          <span className="hidden sm:inline">Dashboard</span>
        </a>
        <a href="#" className="hover:text-brand transition text-xs sm:text-base">
          <span className="sm:hidden">💳</span>
          <span className="hidden sm:inline">Transactions</span>
        </a>
        <a href="#" className="hover:text-brand transition text-xs sm:text-base">
          <span className="sm:hidden">👤</span>
          <span className="hidden sm:inline">Profile</span>
        </a>
      </nav>
    </aside>
  )
}

export default Sidebar