import React, { Component, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import TranslationTable from "./Tables/TranslationTable";
import axios from "axios";
import TranslationDetailsTable from "./Tables/TranslationDetailsTable";
import HomeModal from "./HomeModal";
import TranslationDetailsPhoneTable from "./Tables/TranslationsDetailsPhoneTable";

const OldHomeComp = () => {
  const [loggedIn, setLoggedIn] = useState(true); // Track user authentication status
  const role = localStorage.getItem("role");
  let showDeleteBtn = false;
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [searchRegion, setSearchRegion] = useState("");
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await handleSearch();
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Token not found. User not authenticated.");
          return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

    fetchUser();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `api/translations?searchTerm=${searchTerm}&searchRegion=${searchRegion}&searchCountry=${searchCountry}`
      );
      if (response.status === 200) {
        const translationsData = response.data;
        setTranslations(translationsData);
        console.log("Fetched translation data:", translationsData);
      } else {
        setTranslations([]);
        console.error(
          "Failed to fetch translation data, status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching translation data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (translation) => {
    setSelectedTranslation(translation);
    setShowModal(true);
  };

  if (loggedIn === true || role || role === "Admin") {
    showDeleteBtn = true;
  }

  return (
    <div>
      <div className="row">
        <div className="col">
          <input
            type="text"
            placeholder="Region"
            name="searchRegion"
            value={searchRegion}
            onChange={(event) => setSearchRegion(event.target.value)}
            className="form-control"
            maxLength={30}
          />
        </div>
        <div className="col">
          <input
            type="text"
            placeholder="Land"
            name="searchCountry"
            value={searchCountry}
            onChange={(event) => setSearchCountry(event.target.value)}
            className="form-control"
            maxLength={30}
          />
        </div>
        <div className="col">
          <input
            type="text"
            placeholder="Begrep"
            name="searchTerm"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="form-control"
            maxLength={30}
          />
        </div>
        <div className="col">
          <button onClick={handleSearch} className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faFilter} /> Søk
          </button>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", paddingRight: "1rem" }}>
          <h4>Begreper</h4>
          {translations.length === 0 ? (
            <span>Ingen treff på søket.</span>
          ) : (
            <TranslationTable
              translations={translations}
              handleRowClick={handleRowClick}
            ></TranslationTable>
          )}
        </div>
        <div style={{ width: "50%" }}>
          <h4>Oversettelsesdetaljer</h4>
          {selectedTranslation !== null ? (
            <TranslationDetailsTable
              translation={selectedTranslation}
              showDeleteBtn={showDeleteBtn}
            />
          ) : (
            <span>Trykk på en konseptoversettelse for å se detaljene</span>
          )}
        </div>

        {selectedTranslation != null ? (
          <div class="d-lg-none d-xl-block d-xl-none">
            <HomeModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              children={
                <TranslationDetailsPhoneTable
                  translation={selectedTranslation}
                  showDeleteBtn={showDeleteBtn}
                />
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OldHomeComp;
