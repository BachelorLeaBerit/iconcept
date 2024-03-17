import React, { useState, useEffect } from "react";
import SuggestTranslationForm from "../Forms/SuggestTranslationForm";
import axios from "axios";

function SuggestTranslation() {
  const [translationData, setTranslationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/suggestions`);
        if (response.status === 200) {
          //const data = await response.json();
          setTranslationData(response.data);
          setLoading(false);
        } else {
          console.error(
            "Failed to fetch translation data, status:",
            response.status
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching translation data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (formData) => {
    await axios("/api/suggestions", {
      method: "POST",
      data: formData,
    })
    .then (function(response){
      console.log(response.data);
      window.location.reload();
    })
    .catch (function(error) {
      console.error("Error adding translation suggestion:", error);
    })
  };

  return (
    <div>
      <h2>Foreslå konseptoversettelse</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <SuggestTranslationForm
          data={translationData}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}
export default SuggestTranslation;
