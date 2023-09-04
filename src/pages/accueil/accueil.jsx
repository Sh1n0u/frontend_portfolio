import React, { useEffect } from 'react';
import './accueil.scss';
import skillData from '../../assets/competences.json';

function Accueil() {
    useEffect(() => {
        document.title = 'Portfolio Florian Sune'
    }, []);

    const skillsImages = skillData.map((skill, index) => (
        <img
            key={index}
            src={skill.photoUrl}
            alt={skill.title}
            className='skill-image'
        />
    ))

    return (
        <div className="page-accueil">
            <div className="block1">
                <div className="title">
                    <h1 className='text'>Console<span id="point-log">.log</span><span className='parenthesis'>&#40;</span><span className='typing-text'></span><span className='parenthesis'>&#41;</span></h1>
                    <div>
                        <h1 className='subtitle'>Développeur web</h1>
                    </div>
                </div>

                <img src="./images/codeAccueil.jpg" alt="background de l'accueil" />
            </div>
            <div className="block2">
                <div className='part left'>
                    <h2>Compétence</h2>
                    <div className="skills-container">
                        {skillsImages}
                    </div>
                </div>
                <div className='part right'>
                    <h2>Expérience</h2>
                </div>
            </div>
        </div>
    );
}

export default Accueil;
