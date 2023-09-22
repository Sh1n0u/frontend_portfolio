import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '../../componant/box/box';
import Modal from '../../componant/modal/modal';
import './experiences.scss';

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
        <Box key={index} title={project.title} photoUrl={project.imageUrl} onClick={() => openModal(project)} imgClass='img-experience' />
    ));

    return (
        <div className="experience-page">
            <h1>Expériences</h1>
            <div className="project-list">{projectItem}</div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedProject && (
                    <div className="content">
                        <h2>{selectedProject?.title}</h2>
                        <div>
                        {/* eslint-disable-next-line */}
                            <img src={selectedProject?.imageUrl} alt="Photo du projet" />
                            <div
                                className="description"
                                dangerouslySetInnerHTML={{ __html: selectedProject?.description }}
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Experiences;
