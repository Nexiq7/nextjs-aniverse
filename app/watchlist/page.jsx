"use client"
import SavedAnime from '@/components/SavedAnime/SavedAnime';
import { getProfile, getSavedAnimesByUsername } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [savedAnimes, setSavedAnimes] = useState([]);
    const [username, setUsername] = useState();

    const fetchSavedAnimes = async (username) => {
        const savedAnimesData = await getSavedAnimesByUsername(username);
        setSavedAnimes(savedAnimesData);
    };

    const handleDeleteSavedAnime = async (animeId) => {
        await deleteSavedAnime(username, animeId);
        await fetchSavedAnimes(username);
    };

    useEffect(() => {
        const fetchSavedAnimesForUser = async () => {
            const fetchedUser = await getProfile();
            const username = fetchedUser?.username;
            setUsername(fetchedUser?.username);
            fetchSavedAnimes(username);
        }
        fetchSavedAnimesForUser();
    }, []);

    const deleteSavedAnime = async (username, animeId) => {

        try {
            const response = await fetch('http://localhost:5000/saved/removeSavedAnime', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    animeId: animeId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message;
                console.log(errorMessage)
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <main className="flex flex-col 2xl:px-[350px] px-6 my-10">
            <div className='mb-8'>
                <h1 className='text-[40px]'>Watchlist</h1>
            </div>
            <div className='flex flex-col gap-10'>
                {savedAnimes.map((savedAnime, index) => (
                    <SavedAnime
                        key={index}
                        animeId={savedAnime.animeId}
                        handleDeleteSavedAnime={() => handleDeleteSavedAnime(savedAnime.animeId)}
                    />
                ))
                }
            </div >
        </main >
    )
}

export default page