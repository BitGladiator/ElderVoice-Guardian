import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './auth.css'

export default function Signup() {
    const { register } = useAuth()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')

        if (password.length < 6) {
            setError('Password must be at least 6 characters.')
            return
        }

        setLoading(true)
        try {
            await register(name, email, password)
            navigate('/dashboard')
        } catch (err: unknown) {
            const axiosErr = err as { response?: { data?: { message?: string } } }
            setError(axiosErr?.response?.data?.message ?? 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <Link to="/" className="auth-logo">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16C20 18.2091 18.2091 20 16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="16" cy="16" r="2" fill="currentColor" />
                    </svg>
                    ElderVoice Guardian
                </Link>

                <h1 className="auth-heading">Create account</h1>
                <p className="auth-subtext">Join us and start protecting the ones you love.</p>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    {error && <div className="auth-error">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="name">Full name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Jane Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Min. 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" className="auth-submit" disabled={loading}>
                        {loading ? 'Creating account…' : 'Create account'}
                    </button>
                </form>

                <hr className="auth-divider" style={{ marginTop: '1.5rem' }} />
                <p className="auth-footer">
                    Already have an account?{' '}
                    <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    )
}
