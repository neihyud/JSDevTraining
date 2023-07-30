import React from 'react'

const Modal = ({ onClickModal }) => {
    return (
        <div className="modal" onClick={onClickModal}>
            <style jsx>{`
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    background: #000;
                    opacity: 0.5;
                    z-index: 1;
                }
            `}</style>
        </div>
    )
}

export default Modal
