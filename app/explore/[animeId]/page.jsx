"use client"

import GenresMap from '@/components/GenresMap/GenresMap'
import Rating from '@/components/Rating/Rating'
import YouTubePlayer from '@/components/YoutubePlayer/YoutubePlayer'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { getProfile, checkAnimeSaved } from '@/lib/utils'
import useAnimeData from '@/hooks/useAnimeData'
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

const page = () => {
    const [saved, setSaved] = useState(false);
    const [username, setUsername] = useState();
    const params = useParams()
    const animeId = params.animeId;

    const { data, isLoading, error } = useAnimeData(`/${animeId}/full`)

    useEffect(() => {
        initialFetch();
    }, []);

    const initialFetch = async () => {
        try {
            const fetchedUser = await getProfile();
            setUsername(fetchedUser.username);

            const isAnimeSaved = await checkAnimeSaved(fetchedUser.username, animeId);
            setSaved(isAnimeSaved);
        } catch (error) {
            setSaved(false);
        }
    };

    const saveAnime = async (username, animeId) => {
        try {
            const response = await fetch('http://localhost:5000/saved/saveAnime', {
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
                setSaved(false);
            } else {
                setSaved(true);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    const removeAnime = async (username, animeId) => {
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

            setSaved(false);



        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }



    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen absolute left-1/2 -top-10'>
                <ClipLoader color="#fff" size={50} />
            </div>
        )
    }

    if (error) return <p>{error}</p>;


    return (
        <main className="2xl:px-64 px-6 my-5 lg:my-20">
            <div className='w-full min-h-[600px] flex flex-col lg:flex-row gap-10'>
                <div className='w-[250px] h-[400px] lg:w-[550px] lg:h-[600px] relative'>
                    <Image
                        className={`rounded-lg`}
                        src={data?.data.images.jpg.large_image_url}
                        fill
                        alt="Picture of the author"
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className='w-full flex flex-col gap-10'>
                    <div>
                        <h1 className='text-[20px] lg:text-[50px] font-semibold leading-tight'>{data.data.title}</h1>
                    </div>
                    <div className='bg-slate-600 min-h-[100px] w-full rounded-lg flex'>
                        <div className='flex flex-col lg:flex-row py-2 lg:py-0 px-10 gap-10 w-full'>
                            {data.data.studios[0]?.name &&
                                <div className='flex flex-col justify-center'>
                                    <h1 className='text-[24px] text-white font-semibold'>Studio</h1>
                                    <h1 className='text-[18px] text-sky-500 font-semibold'>{data.data.studios[0].name}</h1>
                                </div>
                            }

                            <div className='flex flex-col justify-center'>
                                <h1 className='text-[24px] text-white font-semibold'>Season</h1>
                                {data.data.season && data.data.year ?
                                    (
                                        <h1 className='text-[18px] text-sky-500 font-semibold'>
                                            {data.data.season.charAt(0).toUpperCase() + data.data.season.slice(1)} {data.data.year}
                                        </h1>
                                    ) : (data.data.aired.prop.from.year ? (
                                        <h1 className='text-[18px] text-sky-500 font-semibold'>{data.data.aired.prop.from.year}</h1>
                                    ) : (
                                        <h1 className='text-[18px] text-sky-500 font-semibold'>TBA</h1>
                                    ))}
                            </div>
                            <div className='flex flex-col justify-center'>
                                <h1 className='text-[24px] text-white font-semibold'>Type</h1>
                                <h1 className='text-[18px] text-sky-500 font-semibold'>{data.data.type}</h1>
                            </div>
                            {data.data.episodes && data.data.type != "Movie" &&
                                <div className='flex flex-col justify-center'>
                                    <h1 className='text-[24px] text-white font-semibold'>Episodes</h1>
                                    <h1 className='text-[18px] text-sky-500 font-semibold'>{data.data.episodes} Episodes </h1>
                                </div>
                            }
                            <div className='flex flex-col justify-center'>
                                {saved ? (
                                    <button
                                        onClick={() => removeAnime(username, animeId)}
                                        className='text-[18px] text-white font-semibold bg-sky-700 p-2 rounded-lg flex items-center gap-2'>Saved
                                        <span><FaBookmark /></span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => saveAnime(username, animeId)}
                                        className='text-[18px] text-white font-semibold bg-sky-900 p-2 rounded-lg flex items-center gap-2'>Add to Watchlist
                                        <span><FaRegBookmark /></span>
                                    </button>
                                )}

                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col lg:flex-row gap-10 h-full'>
                        <div className='w-full lg:w-1/3 h-full bg-slate-600 rounded-lg flex flex-col px-10 py-5 gap-10'>
                            {data.data.genres && (
                                <div className='flex flex-col'>
                                    <h1 className='text-[24px] text-white font-semibold -mb-2'>Genres</h1>
                                    <GenresMap genres={data.data.genres} />
                                </div>
                            )}
                            {data.data.score && (
                                <div className='flex items-center justify-center'>
                                    <Rating score={data.data.score} />
                                </div>
                            )}
                        </div>
                        <div className='hidden lg:w-2/3 min-h-[350px] bg-slate-600 rounded-lg lg:flex px-10 py-5 justify-center'>
                            {data.data.trailer.youtube_id && (
                                <div className='flex flex-col'>
                                    <h1 className='text-[24px] text-white font-semibold'>Trailer</h1>
                                    <YouTubePlayer videoId={data.data.trailer.youtube_id} height={280} width={498} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default page