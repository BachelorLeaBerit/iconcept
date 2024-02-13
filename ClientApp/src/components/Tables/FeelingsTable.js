import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeelingsTable = ({ feelings }) => {
    const navigate = useNavigate();

    const handleRowClick = (feeling) => {
        navigate(`/translation/byTermOrReligion/${feeling.id}/${false}`);
    };

    return (
        <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Feeling</th>
                </tr>
            </thead>
            <tbody>
                {feelings.map(feeling =>
                    <tr key={feeling.id} onClick={() => handleRowClick(feeling)}>
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