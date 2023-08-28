import React, { useEffect } from 'react';
import './competences.scss';

function Competences({ blocks }) {
    useEffect(() => {
        document.title = 'Compétences';
    }, []);

    return (
        <div className='competence-page'>
            <div className='block-section'>
                
            </div>
        </div>
    );
}

export default Competences;
