import React from "react";

const HomeModal = ({ isOpen, onClose, children }) => {

    if (!isOpen) {
        return null;
      }
    
      return (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={onClose}>
              &times;
            </span>
            {children}
          </div>
        </div>
      );
};
export default HomeModal;