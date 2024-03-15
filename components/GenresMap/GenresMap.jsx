import React from 'react'


const GenresMap = (genres) => {

    const genresMap = genres.genres;
    return (
        <div className='flex flex-wrap w-full gap-x-2 gap-y-2 h-auto mt-3 '>
            {genresMap.map((data, i) => (
                <p className='bg-sky-500 rounded-full text-[10px] px-2 py-1 font-semibold' key={i}>{data.name}</p>
            ))}
        </div>
    )
}

export default GenresMap