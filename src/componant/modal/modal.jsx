import React, { useEffect, useState } from 'react';
import './modal.scss';

function Modal({ isOpen, onClose, children }) {
    useEffect(() => {
        const handleEscKeyPress = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        // Ajouter le gestionnaire d'événements lors de l'ouverture de la modale
        if (isOpen) {
            window.addEventListener('keydown', handleEscKeyPress);
        }

        // Supprimer le gestionnaire d'événements lors de la fermeture de la modale ou du démontage du composant
        return () => {
            window.removeEventListener('keydown', handleEscKeyPress);
        };
    }, []);

    return (
        <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-container">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
