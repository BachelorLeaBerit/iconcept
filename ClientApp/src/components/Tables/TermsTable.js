import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsTable = ({ terms, searchRegion, searchCountry }) => {
    const navigate = useNavigate();

    const handleRowClick = (term) => {
        navigate(`/translation/byTermOrReligion/${term.termId}/${true}?searchRegion=${searchRegion}&searchCountry=${searchCountry}`);
    };

    return (
        <table className="table table-striped table-hover" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Term</th>
                </tr>
            </thead>
            <tbody>
                {terms.map(term =>
                    <tr key={term.termId}  onClick={() => handleRowClick(term)}>
                        <td>
                            {term.termName}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default TermsTable;