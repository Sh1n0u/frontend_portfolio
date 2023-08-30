import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box';

const ItemList = ({ items }) => {
    return (
        <div className='item-box'>
            {items.map((item, index) => (
                <Box key={index} title={item.title} photoUrl={item.photoUrl} />
            ))}
        </div>
    );
};

ItemList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            photoUrl: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ItemList;
