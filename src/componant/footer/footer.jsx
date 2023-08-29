import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

function Footer() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <div className="footer">
            <p className="text">&copy; Florian Sune. Tous droits réservés</p>
            {isLoggedIn ? (
                <Link to="/admin">
                    <img
                        className="connexion-logo"
                        src="./connexion-white.png"
                        alt="logo connexion"
                    />
                </Link>
            ) : (
                <Link to="/login">
                    <img
                        className="connexion-logo"
                        src="./connexion-black.png"
                        alt="logo connexion"
                    />
                </Link>
            )}
        </div>
    );
}

export default Footer;
