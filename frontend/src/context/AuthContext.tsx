import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5500/api/auth'

interface User {
    id: string
    name: string
    email: string
}

interface AuthContextType {
    user: User | null
    token: string | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedToken = localStorage.getItem('ev_token')
        const savedUser = localStorage.getItem('ev_user')
        if (savedToken && savedUser) {
            setToken(savedToken)
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        const { data } = await axios.post(`${API_URL}/login`, { email, password })
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem('ev_token', data.token)
        localStorage.setItem('ev_user', JSON.stringify(data.user))
    }

    const register = async (name: string, email: string, password: string) => {
        const { data } = await axios.post(`${API_URL}/register`, { name, email, password })
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem('ev_token', data.token)
        localStorage.setItem('ev_user', JSON.stringify(data.user))
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('ev_token')
        localStorage.removeItem('ev_user')
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
