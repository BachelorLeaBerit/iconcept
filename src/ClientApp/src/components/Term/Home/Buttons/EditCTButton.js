import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "../../../../styles/Term.css";
import { useNavigate } from "react-router-dom";

const EditTranslationButton = ({translation}) => {
  const navigate = useNavigate();

  const toEdit = (id) => {
    let Id = parseInt(id);
    navigate(`/editTranslation/${Id}`);
  };

  return (
    <button
      className="btn btn-light"
      onClick={() => toEdit(translation.objectID)}
    >
      <FontAwesomeIcon icon={faPenToSquare} /> Foreslå endring
    </button>
  );
};

export default EditTranslationButton;
