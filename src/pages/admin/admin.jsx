import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.scss';
import './modal.scss';

function AdminPanel() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);

    const [selectedProject, setSelectedProject] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedProject, setEditedProject] = useState({
        id: null,
        title: '',
        description: '',
    });

    const openEditModal = (project) => {
        setSelectedProject(project);
        setEditedProject(project);
        setIsEditModalOpen(true);
    };

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
        } catch (error) {
            console.error("Erreur lors de l'ajout du projet:", error);
        }
    };

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
    }, []);

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

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData();

        formData.append('title', form.title.value);
        formData.append('description', form.description.value);

        // Vérifiez si un nouveau fichier a été sélectionné
        if (form.newImage.files[0]) {
            formData.append('newImage', form.newImage.files[0]);
        }

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.put(
                `http://localhost:4000/api/projects/${editedProject.id}`,
                formData,
                config
            );
            console.log('Projet modifié avec succès:', response.data);
            setIsEditModalOpen(false);
        } catch (error) {
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
                        {projects.map((project) => (
                            <li key={project.id} onClick={() => openEditModal(project)}>
                                {project.title}
                            </li>
                        ))}
                    </ul>
                </div>
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
                {isEditModalOpen && (
                    <div className="modal">
                        <div className="modal-container">
                            <span className="close" onClick={() => setIsEditModalOpen(false)}>
                                &times;
                            </span>
                            <div className="form-container">
                                <h2>Modifier le projet</h2>
                                <form onSubmit={handleEditSubmit}>
                                    <label htmlFor="title"></label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Titre du projet"
                                        value={editedProject.title}
                                        onChange={(e) =>
                                            setEditedProject({
                                                ...editedProject,
                                                title: e.target.value,
                                            })
                                        }
                                    />
                                    <label htmlFor="newImage"></label>
                                    <input id="newImage" type="file" name="newImage" />

                                    <label htmlFor="description"></label>
                                    <textarea
                                        name="description"
                                        value={editedProject.description}
                                        onChange={(e) =>
                                            setEditedProject({
                                                ...editedProject,
                                                description: e.target.value,
                                            })
                                        }
                                    ></textarea>

                                    <button type="submit">Modifier</button>
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
