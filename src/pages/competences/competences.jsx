import React, { useEffect, useState } from 'react';
import './competences.scss';
import './modal-competence.scss';
import skillsData from '../../assets/competences.json';
import Box from '../../componant/box/box';

function Competences() {
    document.title = 'Compétences';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);

    const openModal = (skill) => {
        setSelectedSkill(skill);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedSkill(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleEscKeyPress = (event) => {
            if (event.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        };

        // Ajouter le gestionnaire d'événements lors de l'ouverture de la modale
        if (isModalOpen) {
            window.addEventListener('keydown', handleEscKeyPress);
        }

        // Supprimer le gestionnaire d'événements lors de la fermeture de la modale ou du démontage du composant
        return () => {
            window.removeEventListener('keydown', handleEscKeyPress);
        };
    }, [isModalOpen]);

    const competenceItems = skillsData.map((skill, index) => (
        <Box key={index} title={skill.title} photoUrl={skill.photoUrl} onClick={() => openModal(skill)} />
    ));

    return (
        <div className="competence-page">
            <h1>Compétences</h1>
            <div className="competence-list">{competenceItems}</div>

            {/* Modale */}
            <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
                <div className="modal-container">
                    <span className="close" onClick={closeModal}>
                        &times;
                    </span>
                    <div className="content">
                        <h2>{selectedSkill && selectedSkill.title}</h2>
                        <div>
                            <img src={selectedSkill && selectedSkill.photoUrl} alt="Logo de la compétence" />
                            <p>{selectedSkill && selectedSkill.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Competences;
