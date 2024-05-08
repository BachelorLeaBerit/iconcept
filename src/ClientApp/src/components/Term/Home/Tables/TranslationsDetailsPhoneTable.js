import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DeleteTranslationButton from "../Buttons/DeleteCTButton";
import '../../../../styles/Term.css';
import { AuthContext } from "../../../Auth/AuthContext";

const TranslationDetailsPhoneTable = ({
  translation,
  resetResetTranslationPage,
}) => {
  const navigate = useNavigate();
  const { profile } = useContext(AuthContext);

  const toEdit = (id) => {
    let Id = parseInt(id);
    navigate(`/editTranslation/${Id}`);
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
                className="btn btn-secondary btnobjectid"
                onClick={() => toEdit(translation.objectID)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
                  {(profile.role.includes("Admin") || profile.role.includes("Redaktør")) && (
                    <DeleteTranslationButton
                    translationId={translation.objectID}
                    onDelete={resetResetTranslationPage} 
                    onError={(error) =>
                      console.error("Error deleting translation:", error)
                    } 
                  />
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
