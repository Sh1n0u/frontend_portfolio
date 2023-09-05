import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './contact.scss';

function Contact() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


    useEffect(() => {
        document.title = 'Contact';
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email: email,
            message: message,
        };

        try {
            axios.post('MON_ADRESSE', formData);

            setEmail('');
            setMessage('');
        } catch (error) {
            console.error("Erreur lors de l'envoi de la requête POST :", error);
        }
    };

    return (
        <div className="contact-page">
            <h1>Contact</h1>
            <div className="contact-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Adresse e-mail :</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message :</label>
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={handleMessageChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit">Envoyer</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;
