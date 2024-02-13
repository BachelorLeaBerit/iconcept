import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsTable = ({ terms }) => {
    const navigate = useNavigate();

    const handleRowClick = (term) => {
        navigate(`/translation/byTermOrReligion/${term.id}/${true}`);
    };

    return (
        <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Term</th>
                </tr>
            </thead>
            <tbody>
                {terms.map(term =>
                    <tr key={term.id}  onClick={() => handleRowClick(term)}>
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