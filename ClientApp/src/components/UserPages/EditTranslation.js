import React, { useState, useEffect } from "react";
import EditTranslationForm from "../Forms/EditTranslationForm";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditTranslation() {
  const { id } = useParams();
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranslation = async () => {
      await axios.get(`api/suggestions/translationToEdit/${id}`)
        .then(response => {
          setTranslation(response.data);
          setLoading(false);
          console.log("Fetched translation data:", response.data);
        })
        .catch(error => {
          console.error(    
            "Failed to fetch translation data, status:",
            error
          );
          setLoading(false);
        });
    };
    fetchTranslation();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const response = await axios("/api/suggestions/translationToEdit", {
        method: "PUT",
        data: formData,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error adding translation suggestion:", error);
      // Handle error, maybe show an error message
    }
  };

  return (
    <div>
      <h1>Foreslå endring</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <EditTranslationForm translation={translation} onSubmit={handleSubmit}/>
      )}
    </div>
  );
}
export default EditTranslation;
