import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.scss';
import './modal-admin.scss';

function AdminPanel() {
    const [isModalAdminOpen, setIsModalAdminOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [addedProject, setAddedProject] = useState(null);
    const [editedProject, setEditedProject] = useState(null);
    const [posts, setPosts] = useState([]);

    const openEditModal = (project) => {
        setSelectedProject(project);
        setIsEditModalOpen(true);
    };

    const openModal = () => {
        setIsModalAdminOpen(true);
    };

    const closeModal = () => {
        setIsModalAdminOpen(false);
        setIsEditModalOpen(false);
    };

    // Fonction POST de projet
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
            setAddedProject(response.data.project);
        } catch (error) {
            console.error("Erreur lors de l'ajout du projet:", error);
        }
    };

    // Fonction GET de projet
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
    }, [addedProject, editedProject]);

    // Fonction Delete de projet
    const handleDeleteProject = async (projectId) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.delete(`http://localhost:4000/api/projects/${projectId}`, config);
            console.log('Projet supprimé avec succès:', response.data);

            // Mise à jour de la liste des projets après la suppression
            setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId));
        } catch (error) {
            console.error('Erreur lors de la suppression du projet:', error);
        }
    };

    // Fonction PUT de projet
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
            console.log(selectedProject._id);
            const response = await axios.put(
                `http://localhost:4000/api/projects/${selectedProject._id}`,
                formData,
                config
            );
            console.log('Projet modifié avec succès:', response.data);

            closeModal();
            setEditedProject(response.data.project);
        } catch (error) {
            console.log(selectedProject._id);
            console.error('Erreur lors de la modification du projet:', error);
        }
    };

    // Fonction GET des messages
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/posts')
            .then((response) => {
                setPosts(response.data); // Utilisez "setPosts" au lieu de "SetPosts"
            })
            .catch((error) => {
                console.log('erreur lors de la récupération des messages', error);
            });
    }, []);

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="admin-page">
            <p className="log-out" onClick={handleLogout}>
                Log-out
            </p>
            <h1>Panneau admin</h1>
            <div className="list-container">
                <div className="project-list">
                    <h2>Liste des projets</h2>
                    <ul>
                        {projects.map((project, index) => (
                            <li key={index}>
                                {project.title}
                                <button onClick={() => openEditModal(project)}>Modifier</button>
                                <button onClick={() => handleDeleteProject(project._id)}>Supprimer</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="message-list">
                    <h2>Liste des messages</h2>
                    {posts.map((post, index) => (
                        <li key={index}>
                            {post.email}
                            {post.message}
                        </li>
                    ))}
                </div>
                {/* modale ajout de projet */}
                <div className={`modal ${isModalAdminOpen ? 'modal-open' : ''}`}>
                    <div className="modal-container">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <div className="form-container">
                            <h2>Ajouter un projet</h2>
                            <form onSubmit={handleFormSubmit}>
                                <label htmlFor="title"></label>
                                <input type="text" name="title" />

                                <label htmlFor="image"></label>
                                <input id="add-picture" type="file" name="image" />

                                <label htmlFor="description"></label>
                                <textarea name="description"></textarea>

                                <button type="submit">Ajouter</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Modale modifier un projet*/}
                <div className={`modal ${isEditModalOpen && selectedProject ? 'modal-open' : ''}`}>
                    <div className="modal-container">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <div className="form-container">
                            <h2>Modifier le projet</h2>
                            <form onSubmit={handleEditFormSubmit}>
                                <label htmlFor="title"></label>
                                <input type="text" name="title" />

                                <label htmlFor="newImage"></label>
                                <input id="newImage" type="file" name="newImage" />

                                <label htmlFor="description"></label>
                                <textarea name="description"></textarea>

                                <button type="submit">Modifier</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <button onClick={openModal}>Ajouter un projet</button>
            </div>
        </div>
    );
}

export default AdminPanel;
