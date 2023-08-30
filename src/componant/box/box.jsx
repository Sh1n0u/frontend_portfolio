import React from 'react';
import PropTypes from 'prop-types';
import './box.scss';

const Box = ({ title, photoUrl, description }) => {
    return (
        <div className="box">
            <h2>{title}</h2>
            <img src={photoUrl} alt="" />
        </div>
    );
};

Box.propTypes = {
    title: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
};

export default Box;
