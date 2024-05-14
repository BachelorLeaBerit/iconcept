import React, { useState, useEffect } from "react";
import axios from "axios";
import ApproveSuggestionsForm from "./ApproveSuggestionForm";

const ApproveSuggestions = () => {
  const [translations, setTranslation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [loggedIn] = useState(true);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found. User not authenticated.");
          return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.get(`api/approvesuggestion/forApproval`);
        setTranslation(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          console.error(error.response.data);
        } else if (error.request) {
          console.error(error.request);
        } else {
          console.error("Error", error.message);
        }
      }
    };

    fetchData();
  }, [updateTrigger]);

  const handleTranslationUpdated = () => {
    setUpdateTrigger((prev) => !prev);
  };

  if (loggedIn === false || !role || role === "Bruker") {
    return (
      <div className="container text-center">
        <h3>Du har ikke tilgang til denne siden.</h3>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-6">
        {loading ? (
          <p>Laster inn...</p>
        ) : (
          <>
            <h4>Nye foreslåtte konseptoversettelser</h4>
            <div className="vstack">
              {translations.some((translation) => translation.status === 2) ? (
                translations
                  .filter((translation) => translation.status === 2)
                  .map((translation) => (
                    <ApproveSuggestionsForm
                      key={translation.id}
                      translation={translation}
                      onTranslationUpdated={handleTranslationUpdated}
                    />
                  ))
              ) : (
                <p>Ingen foreslåtte konseptoversettelser</p>
              )}
            </div>
          </>
        )}
      </div>
      <div className="col-md-6">
        {loading ? (
          <p>Laster inn...</p>
        ) : (
          <>
            <h4>Forslag til redigering av konseptoversettelser</h4>
            <div className="vstack">
              {translations.some((translation) => translation.status === 1) ? (
                translations
                  .filter((translation) => translation.status === 1)
                  .map((translation) => (
                    <ApproveSuggestionsForm
                      key={translation.id}
                      translation={translation}
                      onTranslationUpdated={handleTranslationUpdated}
                    />
                  ))
              ) : (
                <p>Ingen foreslåtte endringer</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ApproveSuggestions;
