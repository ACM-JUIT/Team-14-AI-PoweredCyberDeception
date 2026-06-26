import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="text-center py-12 px-4 sm:py-20">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand">
          🛡️ PhantomShield Banking
        </h1>
      </div>

      <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">
        Welcome to PhantomShield Banking
      </h2>
      <p className="text-gray-600 text-base sm:text-lg mb-8">
        Secure. Reliable. Always protecting your money.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => navigate('/login')}
          className="bg-brand text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          Login
        </button>
        <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
          Learn More
        </button>
      </div>
    </div>
  )
}

export default Home