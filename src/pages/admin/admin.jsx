import React, { useEffect } from 'react';
import './admin.scss';

function Competences() {
    useEffect(() => {
        document.title = 'Panneau admin';
    }, []);

    return (
        <div className='admin-page'>

        </div>
    );
}

export default Competences;
