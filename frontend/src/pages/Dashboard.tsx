import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

export default function Dashboard() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="dashboard-page">
            <nav className="dashboard-nav">
                <a href="/" className="dashboard-nav-logo">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16C20 18.2091 18.2091 20 16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="16" cy="16" r="2" fill="currentColor" />
                    </svg>
                    ElderVoice Guardian
                </a>
                <button className="dashboard-logout-btn" onClick={handleLogout}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                </button>
            </nav>

            <div className="dashboard-body">
                <div className="dashboard-welcome">
                    <div className="dashboard-badge">Dashboard</div>
                    <h1 className="dashboard-title">
                        Welcome, <span>{user?.name ?? 'Friend'}</span>
                    </h1>
                    <p className="dashboard-desc">
                        You're now logged in. Your full dashboard is on the way — stay tuned as we build out your ElderVoice Guardian experience.
                    </p>

                    <div className="dashboard-cards">
                        <div className="dashboard-card">
                            <div className="dashboard-card-icon">🎙️</div>
                            <h3>Voice Monitor</h3>
                            <p>Coming soon</p>
                        </div>
                        <div className="dashboard-card">
                            <div className="dashboard-card-icon">🛡️</div>
                            <h3>Safety Alerts</h3>
                            <p>Coming soon</p>
                        </div>
                        <div className="dashboard-card">
                            <div className="dashboard-card-icon">❤️</div>
                            <h3>Health Insights</h3>
                            <p>Coming soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
