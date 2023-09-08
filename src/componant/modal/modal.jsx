import React from 'react';
import './modal.scss';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-container">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
