import React, { useEffect, useState } from 'react';

const getAnimeProducer = (animeId) => {
    const [producer, setProducer] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null); 

        fetch(`https://kitsu.io/api/edge/media-productions/${animeId}/company`)
            .then((res) => res.json())
            .then((fetchedData) => {
                setProducer(fetchedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            });
    }, [animeId]);

    return { producer, isLoading, error };
};

export default getAnimeProducer;
