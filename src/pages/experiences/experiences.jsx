import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '../../componant/box/box';
import './experiences.scss';
import './modal-experience.scss'

function Experiences() {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const openModal = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProject(null);
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


    // Fonction GET génération de projet
    useEffect(() => {
        document.title = 'Expériences';
        axios
            .get('http://localhost:4000/api/projects')
            .then((response) => {
                setProjects(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des projets :', error);
            });
    }, []);

    const projectItem = projects.map((project, index) => (
        <Box key={index} title={project.title} photoUrl={project.imageUrl} onClick={() => openModal(project)} />
    ));

    return (
        <div className="experience-page">
            <h1>Expériences</h1>
            <div className="project-list">{projectItem}</div>

            {/* Modale */}
            <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
                <div className="modal-container">
                    <span className="close" onClick={closeModal}>
                        &times;
                    </span>
                    <div className="content">
                        <h2>{selectedProject && selectedProject.title}</h2>
                        <div>
                            <img src={selectedProject && selectedProject.imageUrl} alt="Aperçu du projet" />
                            <p>{selectedProject && selectedProject.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Experiences;
