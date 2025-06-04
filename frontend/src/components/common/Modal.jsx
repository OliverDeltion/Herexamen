import React from 'react';

const ModalOverlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(5px)',
    zIndex: 1000,
};

const ModalContent = {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    maxWidth: "90%",
    width: "600px",
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    
};

const Modal = ({ isOpen, onClose, children }) => {
    console.log("Modal isOpen:", isOpen);
    if(!isOpen) {
        return null;
    }
    

    return (
        <div style = { ModalOverlay } onClick = { onClose } >
            <div style={ModalContent} onClick={(e) => e.stopPropagation()}>
                <button style={{ float: "right" }} onClick={onClose}>X</button>
                {children}
            </div>
        </div >
            
    );
    };

    export default Modal;