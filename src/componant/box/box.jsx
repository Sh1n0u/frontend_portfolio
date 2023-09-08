import React from 'react';
import PropTypes from 'prop-types';
import './box.scss';

const Box = ({ title, photoUrl, description, onClick }) => {
    return (
        <div className="box" onClick={onClick}>
            <h2>{title}</h2>
            <img src={photoUrl} alt="" />
            <p>{description}</p>
        </div>
    );
};

Box.propTypes = {
    title: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
    onClick: PropTypes.func,
};

export default Box;
