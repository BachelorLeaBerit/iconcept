import React, { useState } from "react";
import {
  InstantSearch,
  useHits,
  Pagination,
  HitsPerPage,
} from "react-instantsearch";
import algoliasearch from "algoliasearch";
import TranslationTable from "./TranslationTable";
import TranslationDetailsTable from "../../Tables/TranslationDetailsTable";
import "instantsearch.css/themes/algolia.css";
import "@algolia/autocomplete-theme-classic";
import Autocomplete from "./AutoComplete";
import HomeModal from "./HomeModal";
import TranslationDetailsPhoneTable from "./TranslationsDetailsPhoneTable";

const Home = () => {
  const searchClient = algoliasearch(
    "P5EELNNK48",
    "2f296b2c05e3f1e67d580832f292f0d3"
  );

  const [selectedTranslation, setTranslation] = useState(null);
  const handleRowClick = (translation) => {
    setTranslation(translation);
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div class="row">
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
            {selectedTranslation ? (
              <TranslationDetailsTable translation={selectedTranslation} />
            ) : (
            <span>Trykk på en konseptoversettelse for å se detaljene...</span> )}
          </div>
        </div>

        <div class="d-lg-none d-xl-block d-xl-none">
          <HomeModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            children={
              <TranslationDetailsPhoneTable translation={selectedTranslation} />
            }
          />
        </div>
      </div>
    </div>
  );
};

const CustomHits = ({ handleRowClick }) => {
  const { hits } = useHits();
  return (
    <TranslationTable translations={hits} handleRowClick={handleRowClick} />
  );
};

export default Home;
