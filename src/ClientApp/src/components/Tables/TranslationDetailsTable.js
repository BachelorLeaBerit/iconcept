import React, { useState } from "react";


const TranslationDetailsTable = ({ translation, onChange }) => {
  const [formData, setFormData] = useState(
    {
    norwegianDefinition: translation.norwegianDefinition,
    translation: translation.translation,
    Id: translation.id,
    context: translation.context,
    comment: translation.comment
    }
  );

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
    onChange({ name, value });
  };
  
  return (
    <table
      className="table table-striped table-bordered"
      aria-labelledby="tableLabel"
    >
      <tbody>
        <tr className="table-info">
          <th>Begrep</th>
          <td>{translation.termName}</td>
        </tr>
        <tr>
          <th>Norsk definisjon</th>
          <td>
            {translation.status === 2 ? (
              <input
                type="text"
                name="norwegianDefinition"
                value={formData.norwegianDefinition}
                onChange={handleChange}
              />
            ) : (
              translation.norwegianDefinition
            )}
          </td>
        </tr>
        <tr>
          <th>Konsept oversettelse</th>
          <td>{translation.status === 2 ? (
              <input
                type="text"
                name="translation"
                value={formData.translation}
                onChange={handleChange}
              />
            ) : (
              translation.translation
            )}</td>
        </tr>
        {translation.status === 1 && (
          <tr className="table-danger">
            <th>Redigert oversettelse</th>
            <td>{translation.editedTranslation}</td>
          </tr>
        )}
        <tr>
          <th>Følelse(r)</th>
          <td>
            {translation.feelings
              ? translation.feelings
                  .map((feeling) => feeling.feelingName)
                  .join(", ")
              : "N/A"}
          </td>
        </tr>
        <tr>
          <th>Kontekst</th>
          <td>{translation.status === 2 ? (
              <input
                type="text"
                name="context"
                value={formData.context}
                onChange={handleChange}
              />
            ) : (
              translation.context
            )}</td>
        </tr>
        <tr>
          <th>Religion(er)</th>
          <td>
            {translation.religions
              ? translation.religions
                  .map((religion) => religion.religionName)
                  .join(", ")
              : "N/A"}
          </td>
        </tr>
        <tr>
          <th>Land</th>
          <td>
            {translation.countries
              ? translation.countries
                  .map((country) => country.countryName)
                  .join(", ")
              : "N/A"}
          </td>
        </tr>
        <tr>
          <th>Region</th>
          <td>
            {translation.regions
              ? translation.regions
                  .map((region) => region.regionName)
                  .join(", ")
              : "N/A"}
          </td>
        </tr>
        <tr>
          <th>Kommentar</th>
          <td>
          {translation.status === 2 ? (
              <input
                type="text"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
              />
            ) : (
              translation.comment
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TranslationDetailsTable;
