import React from 'react';
import { useNavigate } from 'react-router-dom';

const TranslationTable = ( {translations} ) => {
  const navigate = useNavigate();

  const handleRowClick = (translation) => {
    navigate(`/translation/${translation.id}`);
  };
  console.log(translations)
  return (
    <table className="table table-striped table-hover" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Context</th>
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
