import React, { useState } from "react";
import axios from "axios";
import '../../../styles/Term.css';


import TranslationDetailsTable from "../Home/Tables/TranslationDetailsTable";

function ApproveSuggestionsForm({ translation, onTranslationUpdated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    norwegianDefinition: translation.norwegianDefinition,
    conceptTranslation: translation.translation,
    Id: translation.id,
    context: translation.context,
    comment: translation.comment,
    editorEmail: translation.editorEmail,
  });

  const toggle = () => setIsOpen(!isOpen);

  const handleEditedValues = ({ name, value }) => {
    setEditedData((values) => ({ ...values, [name]: value }));
  };

  const handleApprove = async () => {
    const confirmed = window.confirm("Are you sure you want to approve?");
    if (confirmed) {
      try {
        await axios(`/api/approvesuggestion/`, {
          method: "PUT",
          data: editedData,
        });
        onTranslationUpdated();
      } catch (error) {
        console.error("Error approving translation:", error);
      }
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Er du sikker på at du vil slette konseptoversettelsen?");
    if (confirmed) {
      try {
        if (translation.status === 2) {
          await axios.delete(`/api/approvesuggestion/${translation.id}`);
        } else {
          await axios.put(
            `/api/approvesuggestion/editNotApproved/${translation.id}`
          );
        }
        onTranslationUpdated();
      } catch (error) {
        console.error("Error deleting translation:", error);
      }
    }
  };

  return (
    <>
      <button
        className="btn btn-outline-dark btnapprove"
        onClick={toggle}
      >
        {translation.termName}
      </button>
      {isOpen && (
        <div className="card">
          <div className="card-body">
            <form>
              <TranslationDetailsTable
                translation={translation}
                onChange={handleEditedValues}
              />
              <button className="btn btn-success" onClick={handleApprove}>
                Godkjenn
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Avslå
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ApproveSuggestionsForm;
