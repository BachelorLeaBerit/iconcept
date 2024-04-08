import React from 'react';
import { useNavigate } from 'react-router-dom';

const TranslationTable = ( {translations, handleRowClick} ) => {
  console.log(translations)
  return (
    <table className="table table-hover mt-3" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Konsept</th>
            <th>Kontekst</th>
          </tr>
        </thead>
        <tbody>
          {translations.map(translation =>
            <tr key={translation.id} onClick={() => handleRowClick(translation)}>
              <td>
                  {translation.termName}
              </td>
              <td>
                {translation.context}
              </td>
            </tr>
          )}
        </tbody>
      </table>
  );
};

export default TranslationTable;
