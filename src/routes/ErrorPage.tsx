import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const ErrorPage : React.FC =  () => {
  return (
    <div className='container'>
        <Header/>
        <h1 className='heading'>Oops! Página não encontrada</h1>
        <p className='message'>
            A página que você está procurando pode ter sido removida ou está temporariamente indisponível.
        </p>
  </div>
  )
}

export default ErrorPage