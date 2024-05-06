import React, { useState, useEffect } from "react";
import SuggestTranslationForm from "./SuggestTranslationForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SuggestTranslation() {
  const [translationData, setTranslationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      if (window.confirm("Vellykket innsending av forslag! Ønsker du å sende inn et nytt forslag?")) {
        
      }
      else {
        navigate("/");
      }
    })
    .catch (function(error) {
      console.error("Error adding translation suggestion:", error);
    })
  };

  return (
    <div>
      <h2>Foreslå ny konseptoversettelse</h2>
      {loading ? (
        <p>Laster inn...</p>
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
