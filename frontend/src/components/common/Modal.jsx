import React from 'react';


import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
    console.log("Modal isOpen:", isOpen);
    if(!isOpen) {
        return null;
    }
    

    return (
        <div className="modal-overlay" onClick = { onClose } >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>X</button>
                {children}
            </div>
        </div >
            
    );
    };

    export default Modal;