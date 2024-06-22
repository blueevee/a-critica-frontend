import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo-critica-2.svg';
import header from '../assets/header-decoration.svg';
import '../style/Header.css'

const Header: React.FC = () => {
    return (
        <div className='header-content'>
            <div className="header">
                <div className='void'>
                </div>
                <div className="header-logo">
                    <Link to="/" className='link'> <img src={logo} alt="a critica logo" /></Link>
                </div>
                <nav className="pages">
                    <Link className='link' to="/add">Adicionar crítica</Link>
                    <Link className='link' to="/about">Sobre</Link>
                </nav>
            </div>
            <div className='header-decor'>
                <div className="line"></div>
                <div className="decor">
                    <img src={header} alt="arabesco retrô com duas folhas" />
                </div>
                <div className="line"></div>
            </div>
    </div>
    );
};

export default Header;