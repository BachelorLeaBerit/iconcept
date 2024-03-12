import React, { useState, useEffect } from "react";
import axios from "axios";
import ApproveSuggestionsForm from "../Forms/ApproveSuggestionForm";

function ApproveSuggestions() {
  const [translations, setTranslation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/suggestions/forApproval`);
        setTranslation(response.data);
        setLoading(false);
        console.log("Fetched translation data:", response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      }
    };

    fetchData();
  }, [updateTrigger]);

  const handleTranslationUpdated = () => {
    setUpdateTrigger((prev) => !prev);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Foreslåtte Konseptoversettelser</h2>
          <div className="vstack col-md-5 mx-auto">
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
          <h2>Redigerte Konseptoversettelser</h2>
          <div className="vstack col-md-5 mx-auto">
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
            ): (
              <p>Ingen foreslåtte endringer</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ApproveSuggestions;
