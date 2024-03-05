import React, {useState} from "react";
import { Form, Button, Input, FormGroup, Row, Label } from "reactstrap";

const EditTranslationForm = ({ translation, onSubmit }) => {
  const [formData, setFormData] = useState(
    {
    editedTranslation: translation.translation,
    Id: translation.id
    }
  );

  const handleTranslationChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(values => ({...values, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData)
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Begrep</Label>
          <Input value={translation.termName} readOnly />
        </FormGroup>
        <FormGroup>
          <Label>Konseptoversettelse</Label>
          <Input type="textarea" value={formData.editedTranslation} name="editedTranslation" onChange={handleTranslationChange} />
        </FormGroup>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default EditTranslationForm;
