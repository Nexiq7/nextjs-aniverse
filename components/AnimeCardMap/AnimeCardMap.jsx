import React from 'react'
import getAnimeData from '../../hooks/getAnimeData';
import AnimeCard from '../AnimeCard/AnimeCard';
import { ClipLoader } from 'react-spinners';
import LoadMore from '../LoadMore/LoadMore';

const AnimeCardMap = ({ query }) => {

    const { data, isLoading, error } = getAnimeData(query);

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen absolute left-1/2 -top-10'>
                <ClipLoader color="#fff" size={50} />
            </div>
        )
    }

    if (error) return <p>{error}</p>;

    return (
        <div>
            {
                data.data ? (
                    <div className='grid_layout'>
                        {data.data.map((item, index) => (
                            <div key={index} className='h-[200px] xl:h-[300px]'>
                                <AnimeCard data={item} title={true} />
                            </div>
                        ))}
                        <LoadMore query={query} />
                    </div>
                ) : (
                    <>
                        <div className='flex justify-center items-center w-full h-64'>
                            <h1 className='text-2xl'>No anime matches your search</h1>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default AnimeCardMap