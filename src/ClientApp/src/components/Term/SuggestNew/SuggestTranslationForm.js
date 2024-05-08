import React, { useState, useContext } from "react";
import Select from "react-select/creatable";
import { ValidateForm } from "../../../utils/Validation/SuggestCtValidation";
import '../../../styles/Term.css';
import { AuthContext } from "../../Auth/AuthContext";

const defaultForm = {
  termName: "",
  countries: [],
  religions: [],
  feelings: [],
  regions: [],
  context: "",
  norwegianDefinition: "",
  translation: "",
  comment: "",
  editorEmail: "", 
}

const SuggestTranslationForm = ({ data, onSubmit }) => {
  const { feelings, religions, regions, countries } = data;
  const { profile } = useContext(AuthContext);

  const [formData, setFormData] = useState(defaultForm);
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
    console.log(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      setFormData(defaultForm);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="termName">Begrep*</label>
          <input
            type="text"
            className={"form-control" + (errors.termName ? " is-invalid" : "")}
            id="termName"
            value={formData.termName || ""}
            onChange={(e) => handleChange("termName", e)}
          />
          {errors.termName && <div className="text-danger">{errors.termName}</div>}
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="countries">Land</label>
            <Select
              id="countries"
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
            {errors.countries && <div className="text-danger">{errors.countries}</div>}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="regions">Region</label>
            <Select
              id="regions"
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
            {errors.regions && <div className="text-danger">{errors.regions}</div>}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="religions">Religion</label>
            <Select
              id="religions"
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
            {errors.religions && <div className="text-danger">{errors.religions}</div>}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="feelings">Følelse</label>
            <Select
              id="feelings"
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
            {errors.feelings && <div className="text-danger">{errors.feelings}</div>}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="translation">Konseptoversettelse*</label>
          <textarea
            className={"form-control" + (errors.translation ? " is-invalid" : "")}
            id="translation"
            value={formData.translation || ""}
            onChange={(e) => handleChange("translation", e)}
          />
          {errors.translation && (
            <div className="text-danger">{errors.translation}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="context">Kontekst</label>
          <input
            type="text"
            className={"form-control" + (errors.context ? " is-invalid" : "")}
            id="context"
            value={formData.context || ""}
            onChange={(e) => handleChange("context", e)}
          />
          {errors.context && <div className="text-danger">{errors.context}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="comment">Kommentar</label>
          <input
            type="text"
            className={"form-control" + (errors.comment ? " is-invalid" : "")}
            id="comment"
            value={formData.comment || ""}
            onChange={(e) => handleChange("comment", e)}
          />
          {errors.comment && <div className="text-danger">{errors.comment}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="norwegianDefinition">Norsk definisjon</label>
          <input
            type="text"
            className={"form-control" + (errors.norwegianDefinition ? " is-invalid" : "")}
            id="norwegianDefinition"
            value={formData.norwegianDefinition || ""}
            onChange={(e) => handleChange("norwegianDefinition", e)}
          />
          {errors.norwegianDefinition && (
            <div className="text-danger">{errors.norwegianDefinition}</div>
          )}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="editorEmail">Din e-post* - vil kun være synlig for admin</label>
          <input
            type="text"
            className={"form-control" + (errors.editorEmail ? " is-invalid" : "")}
            id="editorEmail"
            value={profile?.email || formData.editorEmail} 
            onChange={(e) => handleChange("editorEmail", e)}
            disabled={profile?.email}
          />
          {errors.editorEmail && (
            <div className="text-danger">{errors.editorEmail}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn mb-5 btnsendforslag"
        >
          Send inn forslag til godkjenning
        </button>
      </form>
    </div>
  );
};
export default SuggestTranslationForm;
