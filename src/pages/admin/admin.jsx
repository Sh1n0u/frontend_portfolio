import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.scss';
import './modal.scss';

function AdminPanel() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        try {
            const response = await axios.post('http://localhost:4000/api/projects', formData);
            console.log('Projet ajouté avec succès:', response.data);
            closeModal();
        } catch (error) {
            console.error("Erreur lors de l'ajout du projet:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        } else {
            document.title = 'Panneau admin';
        }
    }, []);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="admin-page">
            <h1>Panneau admin</h1>
            <div className="list-container">
                <div className="project-list">
                    <p>Liste des projets</p>
                </div>
                <div className="message-list">
                    <p>Liste des messages</p>
                </div>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-container">
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                            <div className='form-container'>
                                <h2>Ajouter un projet</h2>
                                <form onSubmit={handleFormSubmit}>
                                    <label htmlFor="title"></label>
                                    <input type="text" name="title" placeholder='Titre du projet'/>

                                    <label htmlFor="image"></label>
                                    <input id='add-picture' type="file" name="image" />

                                    <label htmlFor="description"></label>
                                    <textarea name="description"></textarea>

                                    <button type="submit">Ajouter</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="button-container">
                <button onClick={openModal}>Ajouter un projet</button>
            </div>
        </div>
    );
}

export default AdminPanel;
