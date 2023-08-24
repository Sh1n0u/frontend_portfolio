import React from 'react';
import './accueil.scss';

function Accueil() {
    return (
        <div className="page-accueil">
            <div className="block1">
                <div className="title">
                    <h1 className='text'>Console<span id="point-log">.log</span><span className='parenthesis'>&#40;</span><span className='typing-text'></span><span className='parenthesis'>&#41;</span></h1>
                    <div>
                        <h1 className='subtitle'>Développeur web</h1>
                    </div>
                </div>

                <img src="./codeAccueil.jpg" alt="background de l'accueil" />
            </div>
            <div className="block2"></div>
        </div>
    );
}

export default Accueil;
