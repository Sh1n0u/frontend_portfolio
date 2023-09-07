import React, { useEffect } from 'react';
import './competences.scss';
import ItemList from '../../componant/item-list/item-list';
import skillsData from '../../assets/competences.json';

function Competences() {
    useEffect(() => {
        document.title = 'Compétences';
    }, []);

    return (
        <div className="competence-page">
            <h1>Compétences</h1>
            <div>
                <ItemList items={skillsData} />
            </div>
        </div>
    );
}

export default Competences;
