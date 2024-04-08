import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TranslationTable = ( {translations, handleRowClick} ) => {
  console.log(translations)
  return (
    <table className="table table-hover mt-3 table-light" aria-labelledby="tableLabel">
      <thead className="thead-light">
        <tr>
          <th>Konsept</th>
          <th>Kontekst</th>
        </tr>
      </thead>
      <tbody>
        {translations.map((translation) => (
          <tr
            key={translation.id}
            onClick={() => handleClick(translation)} // Pass the entire translation object
            className={clickedRow === translation.id ? 'table-active' : ''}
          >
            <td>{translation.termName}</td>
            <td>{translation.context}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TranslationTable;
