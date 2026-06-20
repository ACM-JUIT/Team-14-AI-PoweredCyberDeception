function Sidebar() {
  return (
    <aside className="bg-brand-dark text-white w-64 min-h-screen p-6 hidden sm:block">
      <h2 className="text-xl font-bold mb-8">PhantomShield</h2>
      <nav className="flex flex-col gap-4">
        <a href="#" className="hover:text-brand transition">Dashboard</a>
        <a href="#" className="hover:text-brand transition">Transactions</a>
        <a href="#" className="hover:text-brand transition">Profile</a>
      </nav>
    </aside>
  )
}

export default Sidebar