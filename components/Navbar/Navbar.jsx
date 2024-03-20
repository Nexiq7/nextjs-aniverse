"use client"

import React, { useState } from 'react'
import Searchbar from '../Searchbar/Searchbar'
import UserNavigation from '../UserNavigation/UserNavigation'
import PageNavigation from '../PageNavigation/PageNavigation'


const Navbar = () => {


    return (
        <div className='z-10 sticky top-0 w-full h-20 flex items-center justify-between bg-[#161925] px-10'>
            <div className='basis-1/3'>
                <PageNavigation />
            </div>
            <div className='basis-[30%]'>
                <Searchbar />
            </div>
            <div className='basis-1/3 flex justify-end'>
                <UserNavigation />
            </div>

        </div>
    )
}

export default Navbar