import React, { useEffect } from 'react';
import './admin.scss';

function Competences() {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        } else {
            document.title = 'Panneau admin';
        }
    }, []);

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
            </div>
        </div>
    );
}

export default Competences;
