import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import TranslationTable from "../Tables/TranslationTable";
import axios from "axios";

function Translations() {
  const { id, byTerm } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchRegion = queryParams.get("searchRegion");
  const searchCountry = queryParams.get("searchCountry");
  const searchTerm = queryParams.get("searchTerm");
  const [translations, setTranslation] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const response = await axios.get(
          `api/translations/byTermOrReligion/${id}/${byTerm}`,
          {
            params: {
              searchRegion: searchRegion,
              searchCountry: searchCountry,
              searchTerm: searchTerm,
            },
          }
        );
        setTranslation(response.data);
        setLoading(false);
        console.log("Fetched translation data:", response.data);
        if (response.data.length === 1) {
          const translationId = response.data[0].id;
          navigate(`/translation/${translationId}`);
        }
        // Handle response
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

    fetchTranslation();
  }, [id, byTerm, searchRegion, searchCountry, searchTerm]);

  return (
    <div>
      <h1>Translation Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TranslationTable translations={translations}></TranslationTable>
      )}
    </div>
  );
}

export default Translations;
