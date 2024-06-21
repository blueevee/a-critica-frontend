import { useNavigate } from 'react-router-dom'
import { ComponentType, useEffect } from 'react'

interface ProtectedRouteProps {
  component: ComponentType
  [x: string]: any
}

const ProtectedRoute = ({ component: Component, ...rest }: ProtectedRouteProps) => {
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem('token') !== null

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  return isAuthenticated ? <Component {...rest} /> : null
}

export default ProtectedRoute
