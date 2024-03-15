"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
//import { IoSearchOutline } from "react-icons/io5";

const Searchbar = ({ widthInPX }) => {

    const [search, setSearch] = useState('');
    const searchParams = useSearchParams()
    const existingSearchParamater = searchParams.get('search');

    const router = useRouter()

    const updateSearchParams = (search) => {

        const searchParams = new URLSearchParams(window.location.search);

        if (search) {
            searchParams.set('search', search);
        } else {
            searchParams.delete('search');
        }

        let baseUrl = window.location.origin;
        let newPathname = window.location.pathname;

        if (!newPathname.endsWith('/explore')) {
            if (!newPathname.endsWith('/')) {
                newPathname += '/';
            }
            newPathname += 'explore';
        }

        newPathname += `?${searchParams.toString()}`;

        router.push(baseUrl + newPathname);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        updateSearchParams(search);
    };

    useEffect(() => {
        // Set initial state based on URL parameters
        const searchParams = new URLSearchParams(window.location.search);
        setSearch(searchParams.get('search') || '');
    }, []);

    return (
        <form className={`hidden md:flex w-[${widthInPX}px] ring-sky-900 ring-1 rounded-lg focus:shadow-sky-900 shadow-md hover:shadow-sky-900 transition-shadow duration-700 px-5 items-center justify-between`} onSubmit={handleSearch}>
            <input className={`bg-transparent outline-none p-2 w-full placeholder:opacity-0 lg:placeholder:opacity-100 `} type="text" placeholder="Search for any anime..." onChange={(e) => setSearch(e.target.value)} value={search} />
            {/* <IoSearchOutline className='hover:cursor-pointer' onClick={handleSearch} />*/}

        </form>
    )
}

export default Searchbar