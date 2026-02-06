import RegisterForm from '../components/RegisterForm'

interface RegisterPageProps {
  setCurrentPage: (page: string) => void
}

export default function RegisterPage({ setCurrentPage }: RegisterPageProps) {
  return <RegisterForm setCurrentPage={setCurrentPage} />
}