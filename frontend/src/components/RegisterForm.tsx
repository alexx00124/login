import { useState } from 'react'
import { authAPI } from '../services/api'
import '../components/AuthForm.css'

interface RegisterFormProps {
  setCurrentPage: (page: string) => void
}

export default function RegisterForm({ setCurrentPage }: RegisterFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState<'success' | 'danger'>('success')
  const [loading, setLoading] = useState(false)

  const validateEmail = (email: string) => {
    return email.includes('@') && email.includes('.')
  }

  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(false)
    setMessage('')

    if (!validateEmail(email)) {
      setMessage('Email inválido')
      setVariant('danger')
      return
    }

    if (!validatePassword(password)) {
      setMessage('La contraseña debe tener al menos 6 caracteres')
      setVariant('danger')
      return
    }

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden')
      setVariant('danger')
      return
    }

    setLoading(true)

    try {
      const data = await authAPI.register(email, password)
      
      if (data.message && data.message.includes('exitosamente')) {
        setMessage(data.message)
        setVariant('success')
        setTimeout(() => {
          setCurrentPage('login')
        }, 2000)
      } else {
        setMessage(data.message || 'Error al registrar usuario')
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
        <h2 className="auth-title">Crear cuenta</h2>
        
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

          <div className="form-group">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar Contraseña"
              required
              className="auth-input"
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes una cuenta? <span onClick={() => setCurrentPage('login')} className="auth-link">Acceder</span>
        </p>
      </div>
    </div>
  )
}