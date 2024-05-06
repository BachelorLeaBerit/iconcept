import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { dateFormatter } from "../../../../utils/Helpers/dateFormatter";
import { Highlight } from "react-instantsearch";
import axios from "axios";
import DetailsTableCell from "./DetailsTableCell";

const TranslationDetailsTable = ({
  translation,
  onChange,
  showDeleteBtn,
  resetResetTranslationPage,
}) => {
  const [formData, setFormData] = useState({
    norwegianDefinition: translation.norwegianDefinition,
    translation: translation.translation,
    Id: translation.id,
    context: translation.context,
    comment: translation.comment,
    editorEmail: translation.editorEmail,
  });
  const navigate = useNavigate();
  const [text, setText] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
    onChange({ name, value });
  };

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

  useEffect(() => {
    const handleClickOutsideTable = (event) => {
      if (!event.target.closest("table")) {
        setText(false);
      }
    };
    document.addEventListener("click", handleClickOutsideTable);
    return () => {
      document.removeEventListener("click", handleClickOutsideTable);
    };
  }, []);

  let formattedDate;
  try {
    formattedDate = dateFormatter(translation.lastModified);
  } catch (error) {
    console.error(error.message);
  }

  console.log("Role:", userRole)
  return (
    <div className="table-responsive">
      <table
        className="table table-striped table-bordered"
        aria-labelledby="tableLabel"
      >
        <tbody>
          <tr className="table-info">
            <th>Begrep</th>
            <td
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {!(translation.status === 2 || translation.status === 1) ? (
                <>
                  <span style={{ marginRight: "auto" }}>
                    <Highlight attribute="termName" hit={translation}>
                      {translation.termName}
                    </Highlight>
                  </span>
                  <button className="btn btn-light" onClick={() => toEdit(translation.objectID)}>
                    <FontAwesomeIcon icon={faPenToSquare} /> Foreslå endring
                  </button>
                  
                  {showDeleteBtn && ( userRole === 'Admin' || userRole === 'Redaktør' ) && (
                    <button className="btn btn-outline-danger" onClick={handleDelete} style={{ marginLeft: '0.5rem' }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    )}
                </>
              ) : (
                <>
                  <span style={{ marginRight: "auto" }}>
                    {translation.termName}
                  </span>
                  <button className="btn btn-info" onClick={() => setText(true)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </>
              )}
            </td>
          </tr>
          <DetailsTableCell
            header={"Norsk definisjon"}
            translation={translation}
            formData={formData.norwegianDefinition}
            name={"norwegianDefinition"}
            handleChange={handleChange}
            text={text}
            setText={setText}
          ></DetailsTableCell>
          <DetailsTableCell
            header={"Konseptoversettelse"}
            translation={translation}
            formData={formData.translation}
            name={"translation"}
            handleChange={handleChange}
            text={text}
            setText={setText}
          ></DetailsTableCell>
          {translation.status === 1 && (
            <tr className="table-danger">
              <th>Redigert oversettelse</th>
              <td>{translation.editedTranslation}</td>
            </tr>
          )}
          <tr>
            <th>Følelser</th>
            <td>
              <Highlight attribute="feelings" hit={translation}>
                {translation.feelings ? translation.feelings.join(", ") : "N/A"}
              </Highlight>
            </td>
          </tr>
          <DetailsTableCell
            header={"Kontekst"}
            translation={translation}
            formData={formData.context}
            name={"context"}
            handleChange={handleChange}
            text={text}
            setText={setText}
          ></DetailsTableCell>
          <tr>
            <th>Religioner</th>
            <td>
              <Highlight attribute="religions" hit={translation}>
                {translation.religions
                  ? translation.religions.join(", ")
                  : "N/A"}
              </Highlight>
            </td>
          </tr>
          <tr>
            <th>Land</th>
            <td>
              <Highlight attribute="countries" hit={translation}>
                {translation.countries
                  ? translation.countries.join(", ")
                  : "N/A"}
              </Highlight>
            </td>
          </tr>
          <tr>
            <th>Region</th>
            <td>
              <Highlight attribute="regions" hit={translation}>
                {translation.regions ? translation.regions.join(", ") : "N/A"}
              </Highlight>
            </td>
          </tr>
          <DetailsTableCell
            header={"Kommentar"}
            translation={translation}
            formData={formData.comment}
            name={"comment"}
            handleChange={handleChange}
            text={text}
            setText={setText}
          ></DetailsTableCell>
          {(translation.status === 1 || translation.status === 2) && (
            <>
              <tr>
                <th>Forfatterens e-post</th>
                <td>{translation.editorEmail}</td>
              </tr>

              <tr>
                <th>Sist endret</th>
                <td>{formattedDate}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TranslationDetailsTable;
