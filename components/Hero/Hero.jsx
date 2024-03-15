import React from 'react'
import AnimeCarousel from '../AnimeCarousel/AnimeCarousel';
import { fetchAnimeData } from '../../ServerActions/Action';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";


const Hero = async () => {

    const topAiring = await fetchAnimeData("?status=airing&order_by=popularity&sort=asc&sfw=true&limit=9");
    const topAllTime = await fetchAnimeData("?status=complete&order_by=popularity&sort=asc&sfw=true&limit=9");

    return (
        <>
            <div className='w-full h-full flex px-28 justify-around'>
                <div className='w-full 2xl:w-5/12 relative rounded-lg 
                mt-10'>
                    <div className='flex flex-col justify-center items-center h-full'>
                        <h1 className='text-[100px] leading-none tracking-wide font-semibold'>Welcome to the <span className='text-sky-500'>aniverse</span></h1>
                        <div className='w-full flex items-center mt-6'>
                            <Link href={`/explore`}>
                                <button className='h-full flex items-center gap-2 hover:gap-3 text-[30px] bg-sky-900 hover:bg-sky-700 transition-all duration-200 ease-in-out rounded-xl tracking-wide px-5 font-normal'>explore <span className='text-[20px]'><FaArrowRight className='mt-1' /></span></button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col 2xl:w-5/12 w-full mt-10 justify-between'>
                    <div className='w-full rounded-lg'>
                        <AnimeCarousel title={"top airing"} animeArray={topAiring.data} />
                        <AnimeCarousel title={"top finished"} animeArray={topAllTime.data} addMargin={true} />
                    </div>
                </div >
                <div className='h-60 w-60 bg-indigo-800 rounded-full absolute bottom-0 right-0 blur-[200px]'>

                </div>
            </div>
        </>
    )
}

export default Hero