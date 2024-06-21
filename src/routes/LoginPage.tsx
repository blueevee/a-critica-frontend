import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Toast } from '../components/Toast';
import '../style/LoginPage.css'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [toastVisible, setToastVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        username,
        password
      })

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        navigate('/add')
      } else {
        setToastVisible(true);
        console.error('ERRO: Não consegui fazer seu login 😭😭');
      }
    } catch (error) {
      setToastVisible(true);
       console.error('ERRO: ocorreu um erro ao iniciar sua sessão 😭😭', error);
    }
    setIsLoading(false);
  }


  return (
    <form className='auth-form' onSubmit={handleSubmit}>
         { isLoading ?
         (<div className="loader"></div>)
         :
         (<>
            <Toast
                message="Acesso negado, crendenciais inválidas!"
                isVisible={toastVisible}
                hideToast={() => setToastVisible(false)}
                className='toast--red'
                />
            <h2>Para acessar essa página você deve se autenticar.</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Qual seu nome de usuário?" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="E a senha?🤭" />
            <button type="submit">Entrar</button>
        </>)
        }
      </form>
  )
}

export default Login;
