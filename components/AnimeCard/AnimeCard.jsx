"use client"

import React, { useState } from 'react'
import Image from 'next/image';
import { MotionDiv } from '../MotionDiv/MotionDiv';
import getAnimeProducer from '@/hooks/getAnimeProducer';


const AnimeCard = ({ data, title }) => {

    console.log(data)

    const [showCardHover, setShowCardHover] = useState(false);

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <>
            <MotionDiv
                className='h-full w-full relative rounded-lg overflow-hidden hover:cursor-pointer'
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{
                    delay: 0,
                    ease: 'easeInOut',
                    duration: 1,
                }}
                viewport={{ amount: 0 }}
            >

                <Image
                    style={{ objectFit: "cover" }}
                    src={data.images.jpg.large_image_url}
                    fill
                    alt='Image'
                    onMouseEnter={() => setShowCardHover(true)}
                    onMouseLeave={() => setShowCardHover(false)}
                />
            </MotionDiv>
            {title &&
                <div className='mt-2'>
                    <h2 className='font-semibold text-sky-100 line-clamp-2 hover:cursor-pointer'>{data.title}</h2>
                </div>}
            {showCardHover && (
                <div className='relative'>
                    <div className='absolute z-50 bg-slate-600 w-[225px] h-[150px] -top-80 left-56 rounded-md p-4'>

                    </div>
                </div>
            )}
        </>
    )
}

export default AnimeCard