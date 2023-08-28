import React, { useEffect } from 'react';
import './error.scss';

function Error() {
    useEffect(() => {
        document.title = ' 404 not found ';
    }, []);
    return (
        <div className="error-page">
            <h2>404</h2>
            <p>Oups, cette page est introuvable</p>
        </div>
    );
}

export default Error;
