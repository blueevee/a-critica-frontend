import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        username,
        password
      })

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        navigate('/add')
      } else {
        console.error('ERRO: Não consegui fazer seu login 😭😭');
      }
    } catch (error) {
       console.error('ERRO: ocorreu um erro ao iniciar sua sessão 😭😭', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nome de usuário" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
      <button type="submit">Entrar</button>
    </form>
  )
}

export default Login;
