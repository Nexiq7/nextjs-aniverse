"use client"

import GenresMap from '@/components/GenresMap/GenresMap'
import Rating from '@/components/Rating/Rating'
import YouTubePlayer from '@/components/YoutubePlayer/YoutubePlayer'
import getAnimeData from '@/hooks/getAnimeData'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { FastAverageColor } from 'fast-average-color';

const page = () => {

    const [shadowColor, setShadowColor] = useState(false);
    const [shadowColorLoading, setShadowColorLoading] = useState(true);
    const params = useParams()
    const animeId = params.animeId;

    const { data, isLoading, error } = getAnimeData(`/${animeId}/full`)

    if (isLoading && shadowColorLoading) {
        return (
            <div className='flex justify-center items-center h-screen absolute left-1/2 -top-10'>
                <ClipLoader color="#fff" size={50} />
            </div>
        )
    }

    if (error) return <p>{error}</p>;

    const fac = new FastAverageColor();
    fac.getColorAsync(data.data.images.jpg.large_image_url)
        .then((color) => {
            setShadowColor(color.rgba.toString())
            setShadowColorLoading(false);
        })
        .catch(e => {
            setShadowColorLoading(false)
        });

    console.log(shadowColor);


    return (
        <main className="2xl:px-64 px-6 my-20 h-screen">
            <div className='w-full min-h-[600px] flex gap-10'>
                <div className='w-[550px] h-[600px] relative'>
                    <Image
                        className={`rounded-lg ${shadowColor ? `shadow-[${shadowColor}] shadow-2xl` : ""}`}
                        src={data.data.images.jpg.large_image_url}
                        fill
                        alt="Picture of the author"
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className='w-full flex flex-col gap-10'>
                    <div>
                        <h1 className='text-[50px] font-semibold leading-tight'>{data.data.title}</h1>
                    </div>
                    <div className='bg-slate-600 min-h-[100px] w-full rounded-lg flex'>
                        <div className='flex flex-row px-10 gap-10'>
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
                        </div>
                    </div>
                    <div className='flex gap-10 h-full'>
                        <div className='w-1/3 h-full bg-slate-600 rounded-lg flex flex-col px-10 py-5 gap-10'>
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
                        <div className='w-2/3 min-h-[350px] bg-slate-600 rounded-lg flex px-10 py-5 justify-center'>
                            {data.data.trailer.youtube_id && (
                                <div className='flex flex-col'>
                                    <h1 className='text-[24px] text-white font-semibold'>Trailer</h1>
                                    <YouTubePlayer videoId={data.data.trailer.youtube_id} />
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