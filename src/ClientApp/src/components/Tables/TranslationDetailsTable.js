import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


const TranslationDetailsTable = ({ translation, onChange }) => {
  const [formData, setFormData] = useState(
    {
    norwegianDefinition: translation.norwegianDefinition,
    translation: translation.translation,
    Id: translation.id,
    context: translation.context,
    comment: translation.comment,
    editorEmail: translation.editorEmail
    }
  );
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
    onChange({ name, value });
  };

  const toEdit = (id) => {
    let Id = parseInt(id);
    navigate(`/editTranslation/${Id}`)
}
  
  return (
    <table
      className="table table-striped table-bordered"
      aria-labelledby="tableLabel"
    >
      <tbody>
        <tr className="table-info">
          <th>Begrep</th>
          {!(translation.status === 2 || translation.status === 1) ? (
             <td style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <span style={{ marginRight: 'auto' }}>{translation.termName}</span>
             <Button onClick={() => toEdit(translation.objectID)}>
               <FontAwesomeIcon icon={faPenToSquare} /> Foreslå endring
             </Button>
           </td>
            ) : (
              <td>{translation.termName}</td>  
            )}
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
          <th>Konseptoversettelse</th>
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
          <th>Følelser</th>
          <td>
            {translation.feelings
              ? translation.feelings
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
          <th>Religioner</th>
          <td>
            {translation.religions
              ? translation.religions
                  .join(", ")
              : "N/A"}
          </td>
        </tr>
        <tr>
          <th>Land</th>
          <td>
            {translation.countries
              ? translation.countries
                  .join(", ")
              : "N/A"}
          </td>
        </tr>
        <tr>
          <th>Region</th>
          <td>
            {translation.regions
              ? translation.regions
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
        <tr>
          <th>Forfatterens e-post</th>
          <td>{translation.editorEmail}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TranslationDetailsTable;
