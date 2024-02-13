import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TranslationTable from './Tables/TranslationTable'


function Translations() {
    const { id, byTerm } = useParams();
    const [translations, setTranslation] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTranslation = async () => {
            try {
                const response = await fetch(`api/translations/byTermOrReligion/${id}/${byTerm}`);
                if (response.ok) {
                    const data = await response.json();
                    setTranslation(data);
                    setLoading(false);
                    console.log('Fetched translation data:', data);
                    if (data.length === 1) {
                        const translationId = data[0].id; // Assuming the translation object has an id property
                        navigate(`/translation/${translationId}`);
                    }
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
                <TranslationTable translations = {translations}></TranslationTable>
            )}
        </div>
    );
}

export default Translations;