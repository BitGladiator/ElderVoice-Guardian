import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

// Landing page sections
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

// Auth pages
import Login from './pages/Login'
import Signup from './pages/Signup'

import './App.css'

function LandingPage() {
    return (
        <div className="app">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Features />
                <Stats />
                <Testimonials />
            </main>
            <Footer />
        </div>
    )
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
