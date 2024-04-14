import React from 'react'
import AnimeCarousel from '../AnimeCarousel/AnimeCarousel';
import { getAnimeDataOnServer } from '../../ServerActions/getAnimeDataOnServer';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";


const Hero = async () => {

    const topAiring = await getAnimeDataOnServer("?status=airing&order_by=popularity&sort=asc&sfw=true&limit=9");
    const topAllTime = await getAnimeDataOnServer("?status=complete&order_by=popularity&sort=asc&sfw=true&limit=9");


    return (
        <>
            <div className='w-full h-full xl:flex justify-around'>
                <div className='w-full 2xl:w-5/12 relative rounded-lg'>
                    <div className='flex flex-col justify-center items-center h-full'>
                        <h1 className='text-[70px] md:text-[90px] lg:text-[100px] leading-none tracking-wide font-semibold'>Welcome to the <span className='text-sky-500'>aniverse</span></h1>
                        <div className='w-full flex items-center mt-6'>
                            <Link href={`/explore`}>
                                <button className='h-full flex items-center gap-2 hover:gap-3 text-[30px] bg-sky-900 hover:bg-sky-700 transition-all duration-200 ease-in-out rounded-xl tracking-wide px-5 font-normal'>explore <span className='text-[20px]'><FaArrowRight className='mt-1' /></span></button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col xl:w-3/5 2xl:w-5/12 w-full justify-between mt-10 sm:mt-0'>
                    <div className='w-full rounded-lg'>
                        <AnimeCarousel title={"top airing"} animeArray={topAiring.data} />
                        <AnimeCarousel title={"top finished"} animeArray={topAllTime.data} addMargin={true} />
                    </div>
                </div >
                <div className='h-64 w-64 sm:h-96 sm:w-96 bg-indigo-800 rounded-full absolute bottom-0 right-0 blur-[200px] -z-10'></div>
                <div className='h-48 w-48 sm:h-64 sm:w-64 bg-sky-500 rounded-full absolute bottom-0 right-96 blur-[200px] -z-10'></div>
            </div>
        </>
    )
}

export default Hero