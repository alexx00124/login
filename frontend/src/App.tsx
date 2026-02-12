import { useState } from 'react'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home')

  return (
    <div className="app">
      {/* Header with logo */}
      <header className="app-header">
        <div className="logo" onClick={() => setCurrentPage('home')}>
          <div className="logo-icon">
            <div className="circle-outer">
              <div className="circle-inner"></div>
            </div>
          </div>
          <span className="logo-text">VALLE DEl SOFTWARE</span>
        </div>
      </header>

      {/* Main content */}
      <main>
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'login' && <LoginPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'register' && <RegisterPage setCurrentPage={setCurrentPage} />}
      </main>
    </div>
  )
}

export default App