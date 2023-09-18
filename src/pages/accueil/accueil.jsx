import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'intersection-observer';
import './accueil.scss';
import axios from 'axios';
import skillsData from '../../assets/competences.json';

function Accueil() {
    const [projects, setProjects] = useState([]);
    const [hoveredProject, setHoveredProject] = useState(null);

    // Affichage du titre de la page dans l'onglet
    useEffect(() => {
        document.title = 'Portfolio Florian Sune';

        const getSelectedProjects = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/projects/selected');
                setProjects(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des projets sélectionnés:', error);
            }
        };

        getSelectedProjects();
    }, []);

    // Affichage de la description lors du passage de la souris sur un projet
    const handleProjectMouseEnter = (project) => {
        setHoveredProject(project.description);
    };
    const handleProjectMouseLeave = () => {
        setHoveredProject(null);
    };

    // Fonction de générétion de barre de progression
    const generateProgressBars = () => {
        return skillsData.map((competence, index) => (
            <div key={index} className="progress-block">
                <img src={competence.photoUrl} alt={competence.title} />
                <div className="progress-bar" style={{ width: `${competence.progression}%` }}>
                    <p>{competence.progression}%</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="page-accueil">
            <div className="banner-title">
                <div className="title">
                    <h1 className="text">
                        Console<span id="point-log">.log</span>
                        <span className="parenthesis">&#40;</span>
                        <span className="typing-text"></span>
                        <span className="parenthesis">&#41;</span>
                    </h1>
                    <div>
                        <h1 className="subtitle">Développeur web</h1>
                    </div>
                </div>

                <img src="./images/codeAccueil.jpg" alt="background de l'accueil" />
            </div>
            <div className="presentation">
                <div className="about-container">
                    <img src="./images/photo_Flo.jpg" alt="Florian Sune" />
                    <div className="text-container">
                        <h2>Qui suis-je ? </h2>
                        <p>
                            Développeur Web Fullstack curieux et attiré par le FrontEnd au plus grand dépit de mon
                            mentor, j'ai acquis une solide expérience en HTML, CSS, JavaScript et React pour concevoir
                            des interfaces dynamiques.
                        </p>
                        <p>
                            J'ai également développé des compétences en BackEnd avec Node.js et MongoDB pour construire
                            des fonctionnalités robustes côté serveur.
                        </p>
                        <p>Toujours à la recherche de nouvelles compétences, je m'améliore au fil du temps.</p>
                    </div>
                </div>
            </div>

            <div className="block-experience">
                <div to="/experience" className="part left">
                    <div className="title-part">
                        <h2>Expérience</h2>
                    </div>
                    <div className="content">
                        <ul>
                            {projects.map((project, index) => (
                                <li
                                    key={index}
                                    onMouseEnter={() => handleProjectMouseEnter(project)}
                                    onMouseLeave={handleProjectMouseLeave}
                                >
                                    <img src={project.imageUrl} alt="Aperçu du projet" />
                                    {project.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link to="/experience" className="show-more">
                        <p>Voir plus</p>
                    </Link>
                </div>
                <div className="part right">
                    <p id="textTransition" className={hoveredProject ? 'hidden' : ''}>
                        Dans ces pages, vous trouverez un échantillon de mes réalisations les plus récentes. Chacun de
                        ces projets a été conçu avec passion, développé avec précision et façonné pour répondre aux
                        besoins spécifiques de mes clients et des utilisateurs finaux.
                    </p>
                    <p id="textTransition" className={hoveredProject ? '' : 'hidden'}>
                        {hoveredProject}
                    </p>
                </div>
            </div>
            <div className="block-competence">
                <Link to="/competence" className="part right">
                    <div className="title-part">
                        <h2>Compétences</h2>
                    </div>
                    <div className="competence-content">{generateProgressBars()}</div>
                </Link>
            </div>
        </div>
    );
}

export default Accueil;
