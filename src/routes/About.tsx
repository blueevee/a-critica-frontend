import React from 'react'
import '../style/Home.css'
import '../style/About.css'
import leosam from '../assets/sam-1.png';
import mafsam from '../assets/sam-2.png';
import pbsam from '../assets/sam-3.png';
import smilesam from '../assets/sam-4.png';

const About: React.FC = () => {
    return (
      <div>
        <h1>Sobre Camosam!</h1>
        <div className='about-content'>
          <div className='about-col-1'>
            <h2>O que é Camosam?</h2>
            <p>Eu sou o pequeno Sam, e no dia 22 de setembro de 2024, vou ficar um aninho mais velho, camosam é o nome dessa comemoração!
            <br/>
            A minha festinha vai ser incrível, e o tema é todo sobre animais do bosque. Vai ser demais!
            Sabe, meus papais disseram que vão viajar de avião para comemorar comigo. Mas, como não dá para levar muitos presentes no aviãozinho, a gente teve uma ideia super legal! 🎉
            <br/>
            Então, olha só: em vez de trazerem presentes físicos, que tal me darem um dinheirinho?
            <br/>
            É verdade, meu pai não tem um avião só dele, então não dá para lotar de presentes. 😄 Mas, com o dinheiro, a gente vai poder escolher coisas bem legais quando chegarmos lá!
            </p>
            <div className='photos'>
              <img className='col1-sam' src={smilesam}/>
              <img className='col1-sam' src={mafsam}/>
              <img className='col1-sam' src={pbsam}/>
            </div>
          </div>
          <div className='about-col-2'>
            <img className='leo-sam' src={leosam}/>
            <p>Estou tão animado para a camosam! Mal posso esperar para brincar, comer bolo e me divertir muito com todos vocês. Vocês vão, né? Ah, eu vou amar cada dinheirinho que ganhar, e meus papais vão ajudar a cuidar de tudo!
            <br/>
            Obrigado desde já pelo carinho, e até lá, pessoal!
            <br/>
            Beijinhos do pequeno Sam 🎂✈️🎈</p>
          </div>
      </div>
      </div>
    );
  };

  export default About;