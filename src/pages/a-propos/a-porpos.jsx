import React, { useEffect } from 'react';
import './a-propos.scss';

function Apropos() {
    useEffect(() => {
        document.title = 'A propos de moi';
    }, []);

    return (
        <div className='apropos-page'>
            <h1>A propos</h1>
        </div>
    )
}

export default Apropos