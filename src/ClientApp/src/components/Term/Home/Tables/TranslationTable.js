import React from "react";
import { Highlight } from "react-instantsearch";

const TranslationTable = ({ translations, handleRowClick }) => {
  return (
    <div class="table-responsive">
      <table className="table table-hover mt-3" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Konsept</th>
            <th>Kontekst</th>
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
