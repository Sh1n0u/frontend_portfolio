import React, { useEffect } from 'react';
import './about-me.scss';

function AboutMe() {
    useEffect(() => {
        document.title = 'A propos de moi';
    }, []);

    return (
        <div className="about-page">
            <h2>A propos</h2>
            <div className="about-container">
                <img src="./images/photo_Flo.jpg" alt="Florian Sune" />
                <div className="text-container">
                    <p>
                        Développeur Web Fullstack curieux et attiré par le FrontEnd au plus grand dépit de mon mentor, j'ai acquis une solide expérience en HTML, CSS, JavaScript et React pour concevoir
                        des interfaces dynamiques.
                    </p>
                    <p>
                        J'ai également développé des compétences en BackEnd avec Node.js et MongoDB pour construire des
                        fonctionnalités robustes côté serveur.
                    </p>
                    <p>Toujours à la recherche de nouvelles compétences, je m'améliore au fil du temps.</p>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;
