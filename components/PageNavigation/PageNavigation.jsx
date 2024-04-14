import React, { useState } from 'react'
import { MotionDiv } from '../MotionDiv/MotionDiv'
import Link from 'next/link'
import { FaAngleDown } from "react-icons/fa6";

const PageNavigation = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleClick = () => {
        setDropdownOpen(false);
    };

    const variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    const links = [
        {
            category: 'Explore',
            description: 'The Aniverse is huge, enjoy exploring',
            href: '/explore'
        },
        {
            category: 'Watchlist',
            description: 'Keep track of the animies you want to watch',
            href: '/watchlist'
        },
    ];

    return (
        <div>
            <div className='flex items-center'>
                <h1 className='text-[24px] font-medium hover:cursor-pointer'>
                    <Link href="/">aniverse</Link>
                </h1>
                <FaAngleDown className='text-[20px] h-full mt-2 ml-2 hover:text-sky-500 transition-all ease-in-out duration-200' onClick={() => {
                    setDropdownOpen(prevState => !prevState);
                }} />
            </div>
            {
                dropdownOpen && (
                    <MotionDiv
                        className='absolute bg-slate-600 w-[300px] sm:w-[400px] rounded-md z-50 top-16 p-5'
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            delay: 0,
                            ease: 'easeInOut',
                            duration: 0.3,
                        }}
                        viewport={{ amount: 0 }}
                    >

                        <div className='flex flex-col'>
                            {links.map((link, index) => (
                                <Link key={index} href={link.href} onClick={handleClick}>
                                    <div className='p-2 hover:bg-slate-700 hover:rounded-md cursor-pointer'>
                                        <p className='text-[18px] text-sky-500 font-bold'>{link.category}</p>
                                        <p className='opacity-80 text-[14px]'>{link.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </MotionDiv>
                )
            }
        </div>
    )
}
export default PageNavigation