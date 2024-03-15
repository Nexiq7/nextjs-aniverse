import React from 'react'
import GenresMap from '../GenresMap/GenresMap';
import { MotionDiv } from '../MotionDiv/MotionDiv';

const CardHover = ({ data }) => {

    const variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <div className='relative'>
            <div className='z-50 absolute bg-slate-600 w-[225px] h-auto min-h-[150px] -top-80 left-56 rounded-md p-4 overflow-hidden'>
                <div>
                    {data.season && data.year ?
                        (
                            <p className='text-xl font-semibold tracking-wide'>{data.season.charAt(0).toUpperCase() + data.season.slice(1)} {data.year}</p>
                        ) : (data.aired.prop.from.year ? (
                            <p className='text-xl font-semibold tracking-wide'>{data.aired.prop.from.year}</p>
                        ) : (
                            <p className='text-xl font-semibold tracking-wide'>TBA</p>
                        ))}
                </div>
                <div>
                    {data.studios[0] && data.studios[0].name !== null && data.studios[0].name !== undefined && (
                        <p className='text-sky-500 text-sm font-semibold -mt-1'>{data.studios[0].name}</p>
                    )}
                </div>
                <div className='flex'>
                    {data.type && <p className='text-[12px]'>{data.type} </p>}
                    {data.episodes && data.type != "Movie" && <p className='text-[12px] ml-1'>| {data.episodes} Episodes </p>}
                </div>
                <GenresMap genres={data.genres} />
            </div>
        </div>
    )
}

export default CardHover