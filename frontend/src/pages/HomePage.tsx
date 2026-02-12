import '../pages/HomePage.css'

interface HomePageProps {
  setCurrentPage: (page: string) => void
}

export default function HomePage({ setCurrentPage }: HomePageProps) {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Bienvenido a OtakuInfo</h1>
        <p className="home-description">
          Gestiona tu información de manera simple y segura
        </p>

        <div className="home-actions">
          <button 
            className="home-button primary"
            onClick={() => setCurrentPage('login')}
          >
            Iniciar Sesión
          </button>
          <button 
            className="home-button secondary"
            onClick={() => setCurrentPage('register')}
          >
            Crear Cuenta
          </button>
        </div>
      </div>
    </div>
  )
}