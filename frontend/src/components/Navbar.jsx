import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="bg-brand text-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
      <h1
        className="text-lg sm:text-xl font-bold cursor-pointer"
        onClick={() => navigate('/')}
      >
        PhantomShield Banking
      </h1>
      <ul className="flex gap-4 sm:gap-6 text-sm sm:text-base">
        <li className="cursor-pointer hover:opacity-80" onClick={() => navigate('/')}>Home</li>
        <li className="cursor-pointer hover:opacity-80" onClick={() => navigate('/transactions')}>Transactions</li>
        <li className="cursor-pointer hover:opacity-80" onClick={() => navigate('/profile')}>Profile</li>
      </ul>
    </nav>
  )
}

export default Navbar