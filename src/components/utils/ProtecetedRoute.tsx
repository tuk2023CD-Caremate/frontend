import { Navigate } from 'react-router-dom'
import useAuth from './useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuth()

  // 사용자가 인증되지 않았다면 로그인 페이지로 리다이렉션
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
