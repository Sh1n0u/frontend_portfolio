import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

function Header() {
    return (
        <header className="header">
            <img className="logo" src="./logoShinou.png" alt="logo" />
            <nav>
                <ul className="navBar">
                    <li>
                        <Link to="competence">Compétence</Link>
                    </li>
                    <div className="separator"/>
                    <li>
                        <Link to="experience">Expérience</Link>
                    </li>
                    <div className="separator"/>
                    <li>
                        <Link to="apropos">A propos</Link>
                    </li>
                    <div className="separator"/>
                    <li>
                        <Link to="contact">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
