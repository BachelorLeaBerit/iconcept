import React, { useState } from "react";
import { Form, Button, Input, FormGroup, Row, Label, FormFeedback } from "reactstrap";
import Select from "react-select/creatable";
import { ValidateForm } from "../Validation/SuggestCtValidation";

const SuggestTranslationForm = ({ data, onSubmit }) => {
  const { terms, feelings, religions, regions, countries } = data;

  const [formData, setFormData] = useState({
    termName: "",
    countries: [],
    religions: [],
    feelings: [],
    regions: [],
    context: "",
    norwegianDefinition: "",
    translation: "",
    comment: "",
    editorEmail: localStorage.getItem('email') || "", // Prefill editorEmail if user is logged in
  });
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    if (Array.isArray(value)) {
      const selectedValues = value.map((option) => option.value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedValues,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = ValidateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <FormGroup controlid="begrep">
          <Label>Begrep*</Label>
          <Input
            type="text"
            name="termName"
            value={formData.termName || ""}
            onChange={(e) => handleChange("termName", e)}
            invalid={!!errors.termName}
          />
          {errors.termName && <FormFeedback>{errors.termName}</FormFeedback>}
        </FormGroup>
        <Row>
          <FormGroup controlid="land" className="col-md-6">
            <Label>Land</Label>
            <Select
              name="countries"
              value={formData.countries.map((c) => ({
                value: c,
                label: c,
              }))}
              onChange={(selectedOptions) =>
                handleChange("countries", selectedOptions)
              }
              isClearable
              isMulti
              options={countries.map((country) => ({
                value: country.countryName,
                label: country.countryName,
              }))}
              placeholder="Velg"
            />
          </FormGroup>
          <FormGroup controlid="region" className="col-md-6">
            <Label>Region</Label>
            <Select
              name="regions"
              value={formData.regions.map((r) => ({
                value: r,
                label: r,
              }))}
              onChange={(selectedOptions) =>
                handleChange("regions", selectedOptions)
              }
              isClearable
              isMulti
              options={regions.map((region) => ({
                value: region.regionName,
                label: region.regionName,
              }))}
              placeholder="Velg"
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup controlid="religion" className="col-md-6">
            <Label>Religion</Label>
            <Select
              name="religions"
              value={formData.religions.map((r) => ({
                value: r,
                label: r,
              }))}
              onChange={(selectedOptions) =>
                handleChange("religions", selectedOptions)
              }
              isClearable
              isMulti
              options={religions.map((religion) => ({
                value: religion.religionName,
                label: religion.religionName,
              }))}
              placeholder="Velg"
            />
          </FormGroup>
          <FormGroup controlid="feeling" className="col-md-6">
            <Label>Følelse</Label>
            <Select
              name="feelings"
              value={formData.feelings.map((f) => ({
                value: f,
                label: f,
              }))}
              onChange={(selectedOptions) =>
                handleChange("feelings", selectedOptions)
              }
              isClearable
              isMulti
              options={feelings.map((feeling) => ({
                value: feeling.feelingName,
                label: feeling.feelingName,
              }))}
              placeholder="Velg"
            />
          </FormGroup>
        </Row>
        <FormGroup controlid="konseptoversettelse">
          <Label>Konseptoversettelse*</Label>
          <Input
            type="textarea"
            name="translation"
            value={formData.translation || ""}
            onChange={(e) => handleChange("translation", e)}
            invalid={!!errors.translation}
          />
          {errors.translation && <FormFeedback>{errors.translation}</FormFeedback>}
        </FormGroup>
        <FormGroup controlid="kontekst">
          <Label>Kontekst</Label>
          <Input
            type="text"
            name="context"
            value={formData.context || ""}
            onChange={(e) => handleChange("context", e)}
            invalid={!!errors.context}
          />
          {errors.context && <FormFeedback>{errors.context}</FormFeedback>}
        </FormGroup>
        <FormGroup controlid="kommentar">
          <Label>Kommentar</Label>
          <Input
            type="text"
            name="comment"
            value={formData.comment || ""}
            onChange={(e) => handleChange("comment", e)}
            invalid={!!errors.comment}
          />
          {errors.comment && <FormFeedback>{errors.comment}</FormFeedback>}
        </FormGroup>
        <FormGroup controlid="norskdef">
          <Label>Norsk definisjon</Label>
          <Input
            type="text"
            name="norwegianDefinition"
            value={formData.norwegianDefinition || ""}
            onChange={(e) => handleChange("norwegianDefinition", e)}
            invalid={!!errors.norwegianDefinition}
          />
          {errors.norwegianDefinition && <FormFeedback>{errors.norwegianDefinition}</FormFeedback>}
        </FormGroup>
        <FormGroup controlid="editoremail">
          <Label>Din e-post* - vil kun være synlig for admin </Label>
          <Input
            type="text"
            name="editoremail"
            value={formData.editorEmail}
            onChange={(e) => handleChange("editorEmail", e)}
            disabled={localStorage.getItem('email') !== null} // Disable input if user is logged in
            invalid={!!errors.editorEmail}
          />          
          {errors.editorEmail && <FormFeedback>{errors.editorEmail}</FormFeedback>}
        </FormGroup>

        <Button type="submit" className="mb-3" style={{ backgroundColor: "#BFEA7C", color: "black" }}>
          Send inn forslag til godkjenning
        </Button> 
      </Form>
    </div>
  );
};
export default SuggestTranslationForm;
