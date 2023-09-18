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


    const sendEmail = async (email, message) => {
        try {
            const response = await axios.post('http://localhost:4000/api/nodemailer/sendEmail', {
                email: email,
                message: message,
            })

            console.log(response.data.message)
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail :', error)
        }
    }

    sendEmail(email, message)

    return (
        <div className="contact-page">
            <h1>Contact</h1>
            <div className='text'>N'hésitez pas à m'envoyez vos demande, à me partager vos avis et vos réclamations, ou simplement à passer dire Bonjour</div>
            <div className="contact-form">
                <form onSubmit={sendEmail}>
                    <div className="form-group">
                        <label htmlFor="email"></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Votre adresse mail'
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message"></label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder='Votre message'
                            value={message}
                            onChange={handleMessageChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit" className='bn53'>Envoyer</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const formData = {
    //         email: email,
    //         message: message,
    //     };

    //     try {
    //         axios.post('http://localhost:4000/api/posts', formData);

    //         setEmail('');
    //         setMessage('');
    //     } catch (error) {
    //         console.error("Erreur lors de l'envoi de la requête POST :", error);
    //     }
    // };