import React, { useEffect } from 'react';
import './accueil.scss';
import skillData from '../../assets/competences.json';

function Accueil() {
    useEffect(() => {
        document.title = 'Portfolio Florian Sune';
    }, []);

    const skillsImages = skillData.map((skill, index) => (
        <img key={index} src={skill.photoUrl} alt={skill.title} className="skill-image" />
    ));

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
            <div className='presentation'>
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
                <div className="part left">
                    <h2>Compétence</h2>
                    <div className="skills-container">{skillsImages}</div>
                </div>
                <div className="part right">
                    <h2>Expérience</h2>
                </div>
            </div>
        </div>
    );
}

export default Accueil;
