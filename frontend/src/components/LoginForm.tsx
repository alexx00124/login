import { useState } from 'react'
import { authAPI } from '../services/api'
import '../components/AuthForm.css'

interface LoginFormProps {
  setCurrentPage: (page: string) => void
}

export default function LoginForm({ setCurrentPage }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState<'success' | 'danger'>('success')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const data = await authAPI.login(email, password)
      
      if (data.message && data.message.includes('exitoso')) {
        setMessage(data.message)
        setVariant('success')
        setTimeout(() => {
          setCurrentPage('home')
        }, 2000)
      } else {
        setMessage(data.message || 'Credenciales inválidas')
        setVariant('danger')
      }
    } catch (error) {
      setMessage('Error de conexión con el servidor')
      setVariant('danger')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Iniciar sesión</h2>
        
        {message && (
          <div className={`auth-alert ${variant}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo"
              required
              className="auth-input"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="auth-input"
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="auth-footer">
          ¿No tienes una cuenta? <span onClick={() => setCurrentPage('register')} className="auth-link">Crear cuenta</span>
        </p>
      </div>
    </div>
  )
}