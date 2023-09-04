import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '../../componant/box/box';
import './experiences.scss';

function Experiences() {
    const [projects, setProjects] = useState([]);

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

    return (
        <div className="experience-page">
            <h1>Expériences</h1>
            <div className="project-list">
                {projects.map((project, index) => (
                    <Box key={index} title={project.title} photoUrl={project.imageUrl} />
                ))}
            </div>
        </div>
    );
}

export default Experiences;
