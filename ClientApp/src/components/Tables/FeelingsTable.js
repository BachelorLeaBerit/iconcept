import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeelingsTable = ({ feelings, searchRegion, searchCountry, searchTerm }) => {
    const navigate = useNavigate();

    const handleRowClick = (feeling) => {
        navigate(`/translation/byTermOrReligion/${feeling.feelingId}/${false}?searchRegion=${searchRegion}&searchCountry=${searchCountry}&searchTerm=${searchTerm}`);
    };

    return (
        <table className="table table-striped table-hover" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Feeling</th>
                </tr>
            </thead>
            <tbody>
                {feelings.map(feeling =>
                    <tr key={feeling.feelingId} onClick={() => handleRowClick(feeling)}>
                        <td>
                            {feeling.feelingName}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default FeelingsTable;