import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './accueil.scss';
import axios from 'axios';
import skillsData from '../../assets/competences.json';

function Accueil() {
    const [projects, setProjects] = useState([]);

    // Affichage du titre de la page dans l'onglet
    useEffect(() => {
        document.title = 'Portfolio Florian Sune';

        axios
            .get('http://localhost:4000/api/projects')
            .then((response) => {
                setProjects(response.data);
            })
            .catch((error) => {
                console.error('Une erreur est survenue lors de la requête', error);
            });
    }, []);


    // Fonction de générétion de barre de progression
    const generateProgressBars = () => {
        return skillsData.map((competence, index) => (
            <div key={index} className='progress-block'>
                <img src={competence.photoUrl} alt={competence.title} />
                <div className='progress-bar' style={{ width: `${competence.progression}%` }}>
                    <p>{competence.progression}%</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="page-accueil">
            <div className="block1">
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
                <h2>Qui suis-je ? </h2>
                <div className="about-container">
                    <img src="./images/photo_Flo.jpg" alt="Florian Sune" />
                    <div className="text-container">
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

            <div className="block2">
                <Link to="/experience" className="part left">
                    <h2>Expérience</h2>
                    <ul>
                        {projects.map((project, index) => (
                            <li key={index}>
                                <img src={project.imageUrl} alt="" />
                                {project.title}
                            </li>
                        ))}
                    </ul>
                </Link>
                <Link to="/competence" className="part right">
                    <h2>Compétences</h2>
                    {generateProgressBars()}
                </Link>
            </div>
        </div>
    );
}

export default Accueil;
