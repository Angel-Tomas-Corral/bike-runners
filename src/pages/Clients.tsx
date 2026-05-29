import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Clients() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-xl text-center space-y-6">
        <h1 className="text-5xl font-bold text-purple-400">👥 Clientes</h1>
        <p className="text-gray-300 text-lg">Has entrado como <span className="text-purple-400 font-semibold">Cliente</span></p>
        <p className="text-gray-500 text-sm">Bienvenido, {user?.username}</p>

        <button
          onClick={() => navigate('/select-role')}
          className="mt-4 px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
        >
          Cambiar rol
        </button>
        <button
          onClick={() => { logout(); navigate('/login') }}
          className="ml-3 px-6 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
