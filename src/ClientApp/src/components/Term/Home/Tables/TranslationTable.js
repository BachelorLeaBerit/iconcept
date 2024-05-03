import React from 'react';

const TranslationTable = ( {translations, handleRowClick} ) => {
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
      </div>
  );
};

export default TranslationTable;
