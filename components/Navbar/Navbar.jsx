"use client"

import React, { useEffect, useState } from 'react'
import Searchbar from '../Searchbar/Searchbar'
import UserNavigation from '../UserNavigation/UserNavigation'
import PageNavigation from '../PageNavigation/PageNavigation'
import { getProfile } from '@/lib/utils'


const Navbar = () => {

    const [user, setUser] = useState(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await getProfile();
                setUser(fetchedUser);
            } catch (error) {
                console.error('Error fetching current user:', error);
                setUser(null);
            }
        };

        fetchUser();
    }, [isUserLoggedIn, setUser]);


    return (
        <div className='z-10 sticky top-0 w-full h-20 flex items-center justify-between bg-[#161925] px-10'>
            <div className='basis-1/3'>
                <PageNavigation />
            </div>
            <div className='basis-[30%]'>
                <Searchbar />
            </div>
            <div className='basis-1/3 flex justify-end'>
                <UserNavigation user={user} setIsUserLoggedIn={setIsUserLoggedIn} setUser={setUser} />
            </div>
        </div>
    )
}

export default Navbar