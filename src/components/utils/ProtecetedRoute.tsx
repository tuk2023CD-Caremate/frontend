import { Navigate } from 'react-router-dom'
import useAuth from './useAuth'

// Props를 위한 인터페이스 정의
interface ProtectedRouteProps {
  children: React.ReactNode // children을 React.ReactNode 타입으로 명시
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuth()

  // 사용자가 인증되지 않았다면 로그인 페이지로 리다이렉션
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
