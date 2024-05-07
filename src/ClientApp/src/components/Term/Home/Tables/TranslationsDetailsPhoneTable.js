import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../../../styles/Term.css';


const TranslationDetailsPhoneTable = ({
  translation,
  showDeleteBtn,
  resetResetTranslationPage,
}) => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  const toEdit = (id) => {
    let Id = parseInt(id);
    navigate(`/editTranslation/${Id}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Er du sikker på at du vil slette konseptoversettelsen?"
    );
    if (confirmed) {
      try {
        let deleteRes = await axios.delete(
          `/api/translations/${translation.objectID}`
        );
        resetResetTranslationPage();
      } catch (error) {
        console.error("Error deleting translation:", error);
      }
    }
  };

  return (
    <div className="table-responsive">
      <table
        className="table table-striped table-bordered"
        aria-labelledby="tableLabel"
      >
        <tbody>
          <tr className="table-info">
            <td className="tdone">
              <div className="tdtwo">
                <strong>
                  <u>Begrep</u>
                </strong>
                <br />
                <span>{translation.termName}</span>
              </div>
              <button
                className="btn btn-primary btnobjectid"
                onClick={() => toEdit(translation.objectID)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              {showDeleteBtn && ( userRole === 'Admin' || userRole === 'Redaktør' ) && (
                <button className="btn btn-danger" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <strong>
                <u>Norsk definisjon</u>
              </strong>
              <br />
              <span>{translation.norwegianDefinition}</span>
            </td>
          </tr>
          <tr>
            <td>
              <strong>
                <u>Konseptoversettelse</u>
              </strong>
              <br />
              {translation.translation}
            </td>
          </tr>
          <tr>
            <td>
              <strong>
                <u>Følelser</u>
              </strong>
              <br />
              {translation.feelings ? translation.feelings.join(", ") : "N/A"}
            </td>
          </tr>
          <tr>
            <td>
              <strong>
                <u>Kontekst</u>
              </strong>
              <br />
              {translation.context}
            </td>
          </tr>
          <tr>
            <td>
              <strong>
                <u>Religioner</u>
              </strong>
              <br />
              {translation.religions ? translation.religions.join(", ") : "N/A"}
            </td>
          </tr>
          <tr>
            <td>
              <strong>
                <u>Land</u>
              </strong>
              <br />
              {translation.countries ? translation.countries.join(", ") : "N/A"}
            </td>
          </tr>
          <tr>
            <td>
              <strong>
                <u>Region</u>
              </strong>
              <br />
              {translation.regions ? translation.regions.join(", ") : "N/A"}
            </td>
          </tr>
          <tr>
            <td>
              <strong>
                <u>Kommentar</u>
              </strong>
              <br />
              {translation.comment}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TranslationDetailsPhoneTable;
