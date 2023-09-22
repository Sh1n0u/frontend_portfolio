import React, { useState } from 'react';
import './competences.scss';
import skillsData from '../../assets/competences.json';
import Box from '../../componant/box/box';
import Modal from '../../componant/modal/modal';

function Competences() {
    document.title = 'Compétences';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);

    const openModal = (skill) => {
        setSelectedSkill(skill);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedSkill(null);
        setIsModalOpen(false);
    };

    const competenceItems = skillsData.map((skill, index) => (
        <Box key={index} title={skill.title} photoUrl={skill.photoUrl} onClick={() => openModal(skill)} imgClass='img-competence'/>
    ));

    return (
        <div className="competence-page">
            <h1>Compétences</h1>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedSkill && (
                    <>
                        <div className="content">
                            <h2>{selectedSkill?.title}</h2>
                            <div>
                                <img src={selectedSkill?.photoUrl} alt="Logo de la compétence" className='skill-logo'/>
                                <p>{selectedSkill?.description}</p>
                            </div>
                        </div>
                    </>
                )}
            </Modal>
            <div className="competence-list">{competenceItems}</div>
        </div>
    );
}

export default Competences;
