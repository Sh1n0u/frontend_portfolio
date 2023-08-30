import React, { useEffect } from 'react';
import './experiences.scss';
import ItemList from '../../componant/item-list/item-list';

function Experiences() {
    useEffect(() => {
        document.title = 'Expériences';
    }, []);

    return (
        <div className="experience-page">
            <h1>Expériences</h1>
            <div>
                
            </div>
        </div>
    );
}

export default Experiences;
