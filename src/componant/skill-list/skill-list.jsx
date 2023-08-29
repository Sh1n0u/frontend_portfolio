import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box';

const SkillList = ({ skills }) => {
    return (
        <div className='skill-box'>
            {skills.map((skill, index) => (
                <Box key={index} title={skill.title} photoUrl={skill.photoUrl} description={skill.description} />
            ))}
        </div>
    );
};

SkillList.propTypes = {
    skills: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            photoUrl: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default SkillList;
