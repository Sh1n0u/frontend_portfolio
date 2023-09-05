import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.scss';
import './modal.scss';

function AdminPanel() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [addedProject, setAddedProject] = useState(null)
    const [editedProject, setEditedProject] = useState(null);

    const openEditModal = (project) => {
        setSelectedProject(project);
        setIsEditModalOpen(true);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(false);
    };

    // Fonction POST
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData();

        formData.append('title', form.title.value);
        formData.append('description', form.description.value);
        formData.append('image', form.image.files[0]);

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.post('http://localhost:4000/api/projects', formData, config);
            console.log('Projet ajouté avec succès:', response.data);
            closeModal();
            setAddedProject(response.data.project)
        } catch (error) {
            console.error("Erreur lors de l'ajout du projet:", error);
        }
    };

    // Fonction GET
    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/projects');
                setProjects(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des projets:', error);
            }
        };

        getProjects();
        if (addedProject) {
            setProjects((prevProjects) => [addedProject, ...prevProjects]);
        }
        if (editedProject) {
            setProjects((prevProjects) => {
                const updatedProjects = prevProjects.map((project) =>
                    project._id === editedProject._id ? editedProject : project
                );
                return updatedProjects;
            });
        }
    }, [addedProject, editedProject]);

    // Redirection user
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        } else {
            document.title = 'Panneau admin';
        }
    }, []);

    // Fermeture modale par escape
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

    // Fonction PUT
    const handleEditFormSubmit = async (event) => {
        event.preventDefault();

        if (!selectedProject) {
            console.error('Aucun projet sélectionné pour la modification.');
            closeModal();
            return;
        }

        const form = event.target;
        const formData = new FormData();

        formData.append('title', form.title.value);
        formData.append('description', form.description.value);
        formData.append('newImage', form.newImage.files[0]);

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            console.log(selectedProject._id)
            const response = await axios.put(
                `http://localhost:4000/api/projects/${selectedProject._id}`,
                formData,
                config
            );
            console.log('Projet modifié avec succès:', response.data);

            closeModal();
            setEditedProject(response.data.project);
        } catch (error) {
            console.log(selectedProject._id)
            console.error('Erreur lors de la modification du projet:', error);
        }
    };

    return (
        <div className="admin-page">
            <h1>Panneau admin</h1>
            <div className="list-container">
                <div className="project-list">
                    <h2>Liste des projets</h2>
                    <ul>
                        {projects.map((project, index) => (
                            <li key={index}>
                                {project.title}
                                <button onClick={() => openEditModal(project)}>Modifier</button>
                                
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Modale modifier */}
                {isEditModalOpen && selectedProject && (
                    <div className="modal">
                        <div className="modal-container">
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                            <div className="form-container">
                                <h2>Modifier le projet</h2>
                                <form onSubmit={handleEditFormSubmit}>
                                    <label htmlFor="title"></label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Titre du projet"
                                        defaultValue={selectedProject.title}
                                    />

                                    <label htmlFor="newImage"></label>
                                    <input id="newImage" type="file" name="newImage" />

                                    <label htmlFor="description"></label>
                                    <textarea name="description" defaultValue={selectedProject.description}></textarea>

                                    <button type="submit">Modifier</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                <div className="message-list">
                    <h2>Liste des messages</h2>
                </div>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-container">
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                            <div className="form-container">
                                <h2>Ajouter un projet</h2>
                                <form onSubmit={handleFormSubmit}>
                                    <label htmlFor="title"></label>
                                    <input type="text" name="title" placeholder="Titre du projet" />

                                    <label htmlFor="image"></label>
                                    <input id="add-picture" type="file" name="image" />

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
