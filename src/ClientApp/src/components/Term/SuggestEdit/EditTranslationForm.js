import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ValidateEditForm } from "../../../utils/Validation/EditValidation";
import { AuthContext } from "../../Auth/AuthContext";

const EditTranslationForm = ({ translation, onSubmit }) => {
  const [formData, setFormData] = useState({
    editedTranslation: translation.translation,
    Id: translation.id,
    editorEmail: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { profile } = useContext(AuthContext);


  const handleTranslationChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = ValidateEditForm(formData);
    console.log(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const isConfirmed = window.confirm(
        "Er du sikker på at du vil legge til disse endringene?"
      );
      if (isConfirmed) {
        onSubmit(formData);
        navigate("/");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="termName">Begrep</label>
          <input
            id="termName"
            className="form-control"
            value={translation.termName}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="context">Kontekst</label>
          <textarea
            id="context"
            className="form-control"
            value={translation.context}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="editedTranslation">Konseptoversettelse</label>
          <textarea
            id="editedTranslation"
            className={"form-control" + (errors.editedTranslation ? " is-invalid" : "")}
            value={formData.editedTranslation}
            name="editedTranslation"
            onChange={(e) => handleTranslationChange(e)}
          />
          {errors.editedTranslation && (
            <div className="invalid-feedback">{errors.editedTranslation}</div>
          )}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="editorEmail">Din e-post* - vil kun være synlig for admin</label>
          <input
            type="text"
            className={"form-control" + (errors.editorEmail ? " is-invalid" : "")}
            id="editorEmail"
            value={profile?.email || formData.editorEmail} 
            onChange={(e) => {
              const { value } = e.target;
              const name = e.target.name || "editorEmail";
              handleTranslationChange({ target: { name, value }});
            }}
            disabled={profile?.email}
          />

          {errors.editorEmail && (
            <div className="text-danger">{errors.editorEmail}</div>
          )}
        </div>
        <button type="submit" className="btn btn-warning">
          Send inn forslag
        </button>
      </form>
    </div>
  );
};

export default EditTranslationForm;
