import React, { useEffect } from 'react';
import './competences.scss';
import SkillList from '../../componant/skill-list/skill-list';
import skillsData from '../../assets/competences.json'


function Competences() {
    useEffect(() => {
        document.title = 'Compétences';
    }, []);

    return (
        <div className="competence-page">
            <h1>Compétences</h1>
            <div>
                <SkillList skills={skillsData} />
            </div>

        </div>
    );
}

export default Competences;
