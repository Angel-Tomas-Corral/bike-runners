import { createContext, useContext, useState, type ReactNode } from 'react'

type User = {
  id: number
  username: string
  role: 'bike_runner' | 'client'
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  register: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const API = 'http://localhost:3001'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = sessionStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  const login = async (username: string, password: string) => {
    const res = await fetch(`${API}/users?username=${username}&password=${password}`)
    const users = await res.json()
    if (users.length === 0) return false
    const found = users[0]
    const userData: User = { id: found.id, username: found.username, role: found.role }
    setUser(userData)
    sessionStorage.setItem('user', JSON.stringify(userData))
    return true
  }

  const register = async (username: string, password: string) => {
    const check = await fetch(`${API}/users?username=${username}`)
    const existing = await check.json()
    if (existing.length > 0) return false
    const res = await fetch(`${API}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role: 'bike_runner' }),
    })
    const created = await res.json()
    const userData: User = { id: created.id, username: created.username, role: created.role }
    setUser(userData)
    sessionStorage.setItem('user', JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
