import React, { useState, useEffect, useContext } from "react";
import {
  InstantSearch,
  useHits,
  Pagination,
  HitsPerPage,
} from "react-instantsearch";
import algoliasearch from "algoliasearch";
import TranslationTable from "./Tables/TranslationTable";
import TranslationDetailsTable from "./Tables/TranslationDetailsTable";
import "instantsearch.css/themes/algolia.css";
import "@algolia/autocomplete-theme-classic";
import Autocomplete from "./Search/AutoComplete";
import HomeModal from "./HomeModal";
import TranslationDetailsPhoneTable from "./Tables/TranslationsDetailsPhoneTable";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthContext";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const { profile } = useContext(AuthContext);
  let showDeleteBtn = false;
  
  const searchClient = algoliasearch(
    "P5EELNNK48",
    "2f296b2c05e3f1e67d580832f292f0d3"
  );

  const [selectedTranslation, setTranslation] = useState(null);
  const handleRowClick = (translation) => {
    setTranslation(translation);
    setShowModal(true);
  };

  const handleResetTranslation = () => {
    setTranslation(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
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

    fetchData();
  }, []);

  if (loggedIn === true || profile.role || profile.role.includes("Admin") || profile.role.includes("Redaktør")) {
    showDeleteBtn = true;
  }

  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div class="row mb-5">
        <div class="col-lg-6">
          <h4 className="mt-3">Begreper</h4>
          <InstantSearch searchClient={searchClient} indexName="bachelor_index">
            <Autocomplete
              placeholder="Søk etter konseptoversettelser..."
              detachedMediaQuery="none"
              openOnFocus
            />
            <CustomHits handleRowClick={handleRowClick} />
            <HitsPerPage
              items={[
                { label: "10 rader per side", value: 10, default: true },
                { label: "25 rader per side", value: 25 },
              ]}
            />
            <Pagination padding={2} className="Pagination" />
          </InstantSearch>
        </div>

        <div class="col-lg-6 d-none d-lg-block">
          <div class="position-sticky top-0">
            <h4 className="mt-3">Oversettelsesdetaljer</h4>
            {selectedTranslation != null ? (
              <TranslationDetailsTable
                translation={selectedTranslation}
                showDeleteBtn={showDeleteBtn}
                resetResetTranslationPage={handleResetTranslation}
              />
            ) : (
              <span>Trykk på en konseptoversettelse for å se detaljene</span>
            )}
          </div>
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
                  resetResetTranslationPage={handleResetTranslation}
                />
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CustomHits = ({ handleRowClick }) => {
  const { hits } = useHits();
  if (hits.length === 0) {
    return (<span>Ingen resultat funnet.</span>);
  }
  return (
    <TranslationTable translations={hits} handleRowClick={handleRowClick} />
  );
};

export default Home;
