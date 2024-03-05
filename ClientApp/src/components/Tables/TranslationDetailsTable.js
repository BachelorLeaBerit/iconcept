import React from "react-router-dom";

const TranslationDetailsTable = ({ translation }) => {
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
          <td>{translation.norwegianDefinition}</td>
        </tr>
        <tr>
          <th>Konsept oversettelse</th>
          <td>{translation.translation}</td>
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
          <td>{translation.context}</td>
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
      </tbody>
    </table>
  );
};

export default TranslationDetailsTable;
