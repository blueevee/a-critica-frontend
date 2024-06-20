import React from 'react'
import '../style/About.css'

const About: React.FC = () => {
    return (
      <div className="about-container">
        <h1>A crítica!</h1>
        <div className='about-content'>
            <p>Se há algo que eu e meu digníssimo adoramos fazer, é sair para comer e avaliar como se fôssemos grandes e renomados sommeliers de gastronomia. Para nossos amigos, parece que realmente somos, pois volta e meia nos consultam como referência sobre os melhores lugares para comer e tipos de comida.
            <br/>
            <br/>
            Um belo dia, durante um almoço no Pecorino, enquanto conversávamos e avaliávamos a comida, meu querido me provocou: 🤔<span>"Por que não fazemos nosso próprio blog para anotar nossas avaliações e enviar para nossos amigos?" </span>🤔
            <br/>
            <br/>
            Então, resolvi transformar essa provocação em realidade e cá está nosso blog pessoal de críticas gastronômicas e acervo das nossas visitas culinárias.
            <br/>
            <br/>
            <strong>
            Sejam bem-vindos, amigos e conhecidos! Espero que nossos comentários sejam úteis para vocês!
            </strong>
            </p>
        </div>
      </div>
    );
  };

  export default About;