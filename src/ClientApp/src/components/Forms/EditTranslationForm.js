import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidateEditForm } from "../../utils/Validation/EditValidation";

const EditTranslationForm = ({ translation, onSubmit }) => {
  const [formData, setFormData] = useState({
    editedTranslation: translation.translation,
    Id: translation.id,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

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
            onChange={handleTranslationChange}
          />
          {errors.editedTranslation && (
            <div className="invalid-feedback">{errors.editedTranslation}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Send inn forslag
        </button>
      </form>
    </div>
  );
};

export default EditTranslationForm;
