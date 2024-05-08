import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import '../../../../styles/Term.css';

const DeleteTranslationButton = ({ translationId, onDelete, onError }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Er du sikker på at du vil slette konseptoversettelsen?"
    );
    if (confirmed) {
      try {
        await axios.delete(`/api/translations/${translationId}`);
        onDelete(); 
      } catch (error) {
        console.error("Error deleting translation:", error);
        onError(error); 
      }
    }
  };
  return (
    <button onClick={handleDelete} className="btn btn-outline-danger btnhandledelete">
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );
};

export default DeleteTranslationButton;
