import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import RoleSelector from './pages/RoleSelector'
import BikeRunners from './pages/BikeRunners'
import Clients from './pages/Clients'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/select-role" element={<RoleSelector />} />
      <Route path="/bike-runners" element={<BikeRunners />} />
      <Route path="/clients" element={<Clients />} />
    </Routes>
  )
}
