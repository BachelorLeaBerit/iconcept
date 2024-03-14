import React, {useState} from "react";
import { Form, Button, Input, FormGroup, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";

const EditTranslationForm = ({ translation, onSubmit }) => {
  const [formData, setFormData] = useState(
    {
    editedTranslation: translation.translation,
    Id: translation.id
    }
  );
  const navigate = useNavigate();

  const handleTranslationChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(values => ({...values, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to submit the changes?");
    if (isConfirmed) {
      onSubmit(formData);
      navigate("/");
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Begrep</Label>
          <Input value={translation.termName} disabled/>
        </FormGroup>
        <FormGroup>
          <Label>Konseptoversettelse</Label>
          <Input type="textarea" value={formData.editedTranslation} name="editedTranslation" onChange={handleTranslationChange} />
        </FormGroup>
        <Button type="submit">
          Send inn forslag
        </Button>
      </Form>
    </div>
  );
};
export default EditTranslationForm;
