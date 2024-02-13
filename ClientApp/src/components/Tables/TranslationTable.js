import React from 'react';
import { useNavigate } from 'react-router-dom';

const Table = ( {translations} ) => {
  const navigate = useNavigate();

  const handleRowClick = (translation) => {
    navigate(`/translation/${translation.id}`);
  };

  return (
    <table className="table table-striped" aria-labelledby="tableLabel">
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
                  {translation.term.termName}
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

export default Table;
