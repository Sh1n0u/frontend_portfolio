import React, { useState } from 'react';
import './login.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="login-page">
            <p>Connexion</p>
            <form>
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
            </form>
        </div>
    );
}

export default Login;
