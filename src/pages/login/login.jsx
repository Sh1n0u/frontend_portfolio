import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';
import axios from 'axios';

function Login() {
    useEffect(() => {
        document.title = 'Login';
    }, []);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/login', {
                email: email,
                password: password,
            });
            localStorage.setItem('token', response.data.token);
            navigate('/admin');
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    };

    return (
        <div className="login-page">
            <p>Connexion</p>
            <form onSubmit={handleSubmit}>
                <div className="login-form">
                    <label htmlFor="email" />
                    <input
                        type="email"
                        id="email"
                        placeholder="Adresse mail"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="login-form">
                    <label htmlFor="password" />
                    <input
                        type="password"
                        id="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;
