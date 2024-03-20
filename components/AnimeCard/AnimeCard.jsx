"use client"

import React, { useState } from 'react'
import Image from 'next/image';
import { MotionDiv } from '../MotionDiv/MotionDiv';
import CardHover from '../CardHover/CardHover';
import Link from 'next/link';


const AnimeCard = ({ data, title }) => {

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
                <Link href={`/explore/${data.mal_id}`}>
                    <Image
                        style={{ objectFit: "cover" }}
                        src={data.images.jpg.large_image_url}
                        fill
                        alt='Image'
                        onMouseEnter={() => setShowCardHover(true)}
                        onMouseLeave={() => setShowCardHover(false)}
                    />
                </Link>
            </MotionDiv >
            {title &&
                <div className='mt-2'>
                    <h2 className='font-semibold text-sky-100 line-clamp-2 hover:cursor-pointer'>{data.title}</h2>
                </div>
            }
            {
                showCardHover && (
                    <CardHover data={data} />
                )
            }
        </>
    )
}

export default AnimeCard