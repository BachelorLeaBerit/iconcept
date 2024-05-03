import React from "react";
import { useHits } from "react-instantsearch";
import TranslationTable from "../Tables/TranslationTable";

const CustomHits = ({ handleRowClick }) => {
  const { hits } = useHits();
  return (
    <TranslationTable translations={hits} handleRowClick={handleRowClick} />
  );
};

export default CustomHits;
