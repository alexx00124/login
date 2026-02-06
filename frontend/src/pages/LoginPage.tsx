import LoginForm from '../components/LoginForm'

interface LoginPageProps {
  setCurrentPage: (page: string) => void
}

export default function LoginPage({ setCurrentPage }: LoginPageProps) {
  return <LoginForm setCurrentPage={setCurrentPage} />
}