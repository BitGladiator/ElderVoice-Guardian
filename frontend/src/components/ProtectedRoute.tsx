import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ReactNode } from 'react'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { token, loading } = useAuth()

    if (loading) return null

    if (!token) return <Navigate to="/login" replace />

    return <>{children}</>
}
