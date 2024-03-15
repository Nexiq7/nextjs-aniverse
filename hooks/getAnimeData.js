import React, { useEffect, useState } from 'react';

const getAnimeData = (query) => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null); 

        fetch(`https://api.jikan.moe/v4/anime${query}`)
            .then((res) => res.json())
            .then((fetchedData) => {
                setData(fetchedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            });
    }, [query]);

    return { data, isLoading, error };
};

export default getAnimeData;
