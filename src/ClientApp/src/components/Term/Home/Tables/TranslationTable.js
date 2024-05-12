import React from "react";
import { Highlight } from "react-instantsearch";
import logo from "./AlgoliaLogo.png";
import '../../../../styles/Term.css';

const TranslationTable = ({ translations, handleRowClick }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover mt-3" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Konsept</th>
            <th className="tdtrans">Kontekst
              <img src={logo} alt="Algolia logo" className="algolia-logo"/>
            </th>
          </tr>
        </thead>
        <tbody>
          {translations.map((translation) => (
            <tr
              key={translation.id}
              onClick={() => handleRowClick(translation)}
            >
              <td>
                <Highlight attribute="termName" hit={translation}>
                  {translation.termName}
                </Highlight>
              </td>
              <td>
                <Highlight attribute="context" hit={translation}>
                  {translation.context}
                </Highlight>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TranslationTable;
