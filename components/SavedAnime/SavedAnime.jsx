"use client"
import Image from 'next/image'
import React from 'react'
import { ClipLoader } from 'react-spinners'
import GenresMap from '../GenresMap/GenresMap'
import useAnimeData from '@/hooks/useAnimeData'

const SavedAnime = ({ animeId, handleDeleteSavedAnime }) => {

    const { data, isLoading, error } = useAnimeData(`/${animeId}`)

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen absolute left-1/2 -top-10'>
                <ClipLoader color="#fff" size={50} />
            </div>
        )
    }

    return (
        <div className='bg-gradient-to-l from-sky-900 from-40% min-h-[100px] rounded-lg flex items-center px-4 justify-between'>
            <div className='flex gap-10'>
                <div>
                    <Image
                        src={data.data.images.jpg.large_image_url}
                        width={50}
                        height={50}
                        alt='SavedAnime'
                        className='rounded-md overflow-hidden' />
                </div>
                <div>
                    <h1 className='text-[18px]'>{data.data.title}</h1>
                    {data.data.genres && (
                        <GenresMap genres={data.data.genres} />
                    )}
                </div>
            </div>
            <div>
                <button className='text-white cursor-pointer bg-red-400/10 px-4 py-2 rounded-lg' onClick={() => handleDeleteSavedAnime(animeId)}>Remove from Watchlist</button>
            </div>
        </div >
    )
}

export default SavedAnime