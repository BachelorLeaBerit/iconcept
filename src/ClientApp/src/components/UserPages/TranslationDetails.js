import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import TranslationDetailsTable from '../Tables/TranslationDetailsTable';

function TranslationDetails() {
    const { id } = useParams();
    const [translation, setTranslation] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const toEdit = () => {
        navigate(`/editTranslation/${id}`)
    }
    
    useEffect(() => {
        const fetchTranslation = async () => {
            try {
                const response = await axios.get(`/api/translations/${id}`);
                setTranslation(response.data);
                setLoading(false);
                console.log('Fetched translation data:', response.data);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchTranslation();
    }, [id]);

    return (
        <div>
            <h3>Oversettelsesdetaljer</h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <TranslationDetailsTable translation={translation}></TranslationDetailsTable>
            )}
            <button className="btn" onClick={toEdit}><FontAwesomeIcon icon={faPenToSquare} /> Foreslå endring</button>
        </div>
    );
}

export default TranslationDetails;
