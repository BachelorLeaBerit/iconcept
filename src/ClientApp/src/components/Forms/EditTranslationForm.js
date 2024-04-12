import React, { useState } from "react";
import { Form, Button, Input, FormGroup, Label, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { ValidateEditForm } from "../Validation/EditValidation";

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
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Begrep</Label>
          <Input value={translation.termName} disabled />
        </FormGroup>
        <FormGroup>
          <Label>Kontekst</Label>
          <Input type="textarea" value={translation.context} disabled />
        </FormGroup>
        <FormGroup>
          <Label>Konseptoversettelse</Label>
          <Input
            type="textarea"
            value={formData.editedTranslation}
            name="editedTranslation"
            onChange={handleTranslationChange}
            invalid={!!errors.editedTranslation}
          />
          {errors.editedTranslation && (
            <FormFeedback>{errors.editedTranslation}</FormFeedback>
          )}
        </FormGroup>
        <Button type="submit">Send inn forslag</Button>
      </Form>
    </div>
  );
};
export default EditTranslationForm;
