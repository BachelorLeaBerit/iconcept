import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function TranslationDetails() {
    const { id } = useParams();
    const [translation, setTranslation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTranslation = async () => {
            try {
                const response = await fetch(`api/translations/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setTranslation(data);
                    setLoading(false);
                    console.log('Fetched translation data:', data);
                } else {
                    console.error('Failed to fetch translation data, status:', response.status);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching translation data:', error);
                setLoading(false);
            }
        };

        fetchTranslation();
    }, [id]); // Dependency on id so that the effect re-runs when id changes

    return (
        <div>
            <h1>Translation Details</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table table-striped table-bordered" aria-labelledby="tableLabel">
                    <tbody>
                    <tr class="table-info">
                        <th>Begrep</th>
                        <td>{translation.term.termName}</td>
                    </tr>
                    <tr>
                        <th>Norsk definisjon</th>
                        <td>{translation.norwegianDefinition}</td>
                    </tr>
                    <tr>
                        <th>Konsept oversettelse</th>
                        <td>{translation.translation}</td>
                    </tr>
                    <tr>
                        <th>Følelse(r)</th>
                        <td>{translation.feelings ? translation.feelings.map(feeling => feeling.feelingName).join(', ') : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Kontekst</th>
                        <td>{translation.context}</td>
                    </tr>
                    <tr>
                        <th>Religion(er)</th>
                        <td>{translation.religions ? translation.religions.map(religion => religion.religionName).join(', ') : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Land</th>
                        <td>{translation.countries ? translation.countries.map(country => country.countryName).join(', ') : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Region</th>
                        <td>{translation.regions ? translation.regions.map(region => region.regionName).join(', ') : 'N/A'}</td>
                    </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TranslationDetails;
