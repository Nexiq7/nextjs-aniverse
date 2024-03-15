"use client"

import React, { useState } from 'react'
import Searchbar from '../Searchbar/Searchbar'
import Link from 'next/link'
import Dropdown from '../Dropdown/Dropdown'
import { FaAngleDown } from "react-icons/fa6";
import { MotionDiv } from "../MotionDiv/MotionDiv";


const Navbar = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleClick = () => {
        setDropdownOpen(false);
    };

    const variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <div className='z-10 sticky top-0 w-full h-20 flex items-center justify-between bg-[#161925] px-10'>
            <div className='flex items-center basis-1/3'>
                <div className='flex items-center'>
                    <h1 className='text-[24px] font-medium hover:cursor-pointer'>
                        <Link href="/">aniverse</Link>
                    </h1>
                    <FaAngleDown className='text-[20px] h-full mt-2 ml-2 hover:text-sky-500 transition-all ease-in-out duration-200' onClick={() => {
                        setDropdownOpen(prevState => !prevState);
                    }} />
                </div>
                {dropdownOpen && (
                    <MotionDiv
                        className='absolute bg-slate-600 w-[400px] rounded-md z-50 top-16 p-5'
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
                            <Link href="/explore" onClick={handleClick}>
                                <div className='p-2 hover:bg-slate-700 hover:rounded-md cursor-pointer'>
                                    <p className='text-[18px] text-sky-500 font-bold'>Explore</p>
                                    <p className='opacity-80 text-[14px]'>The Aniverse is huge, enjoy exploring</p>
                                </div>
                            </Link>
                            <Link href="/" onClick={handleClick}>
                                <div className='p-2 hover:bg-slate-700 hover:rounded-md cursor-pointer'>
                                    <p className='text-[18px] text-sky-500 font-bold'>Watchlist</p>
                                    <p className='opacity-80 text-[14px]'>Keep track of the animies you want to watch</p>
                                </div>
                            </Link>
                        </div>

                    </MotionDiv>
                )}
            </div>
            <div className='basis-[30%]'>
                <Searchbar />
            </div>
            <div className='basis-1/3 flex justify-end'>
                <Dropdown />
            </div>

        </div>
    )
}

export default Navbar