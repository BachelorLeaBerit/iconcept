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
          <Label>Begrep</Label>
          <Input
            type="text"
            name="termName"
            placeholder="Enter Begrep"
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
            />
          </FormGroup>
        </Row>
        <FormGroup controlid="konseptoversettelse">
          <Label>Konseptoversettelse</Label>
          <Input
            type="textarea"
            placeholder="Enter Konseptoversettelse"
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
            placeholder="Enter Kontekst"
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
            placeholder="Enter Kommentar"
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
            placeholder="Enter Kommentar"
            name="norwegianDefinition"
            value={formData.norwegianDefinition || ""}
            onChange={(e) => handleChange("norwegianDefinition", e)}
            invalid={!!errors.norwegianDefinition}
          />
          {errors.norwegianDefinition && <FormFeedback>{errors.norwegianDefinition}</FormFeedback>}
        </FormGroup>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default SuggestTranslationForm;
