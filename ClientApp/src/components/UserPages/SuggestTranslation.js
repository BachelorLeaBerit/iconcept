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
    try {
      const response = await axios("/api/suggestions", {
        method: "POST",
        data: formData,
      });
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error adding translation suggestion:", error);
      // Handle error, maybe show an error message
    }
  };

  return (
    <div>
      <h1>Foreslå konseptoversettelse</h1>
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
