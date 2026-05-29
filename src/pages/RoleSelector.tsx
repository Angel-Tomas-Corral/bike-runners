import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RoleSelector() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold text-white">Bienvenido, {user.username}</h1>
        <p className="text-gray-400">Elige cómo quieres entrar</p>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/bike-runners')}
            className="w-full py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-xl rounded-xl transition"
          >
            🚴 Bike Runners
          </button>

          <button
            onClick={() => navigate('/clients')}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xl rounded-xl transition"
          >
            👥 Clientes
          </button>
        </div>

        <button
          onClick={() => { logout(); navigate('/login') }}
          className="text-gray-500 hover:text-white text-sm transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
